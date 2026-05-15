package com.everglow.backend.bookings;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

/**
 * BookingService - Business logic layer.
 *
 * OOP principles applied:
 *  - Encapsulation : all business rules are hidden inside this service
 *  - Abstraction   : controller only sees high-level methods
 *  - Single Responsibility: each method does exactly one thing
 */
@Service
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;

    // Constructor injection (best practice over @Autowired)
    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // ─── CREATE ───────────────────────────────────────────────────────────────

    /**
     * Create a new booking after validating dates and checking for conflicts.
     */
    public BookingDTO createBooking(BookingDTO dto) {
        validateBookingDates(dto);
        checkForOverlappingBookings(dto.getPropertyId(),
            LocalDate.parse(dto.getCheckInDate()),
            LocalDate.parse(dto.getCheckOutDate()),
            null);

        Booking booking = mapToEntity(dto);
        Booking saved   = bookingRepository.save(booking);
        return BookingDTO.fromEntity(saved);
    }

    // ─── READ (All) ───────────────────────────────────────────────────────────

    /**
     * Retrieve all bookings in the system.
     */
    @Transactional(readOnly = true)
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll()
            .stream()
            .map(BookingDTO::fromEntity)
            .collect(Collectors.toList());
    }

    // ─── READ (Single) ────────────────────────────────────────────────────────

    /**
     * Retrieve a single booking by ID.
     */
    @Transactional(readOnly = true)
    public BookingDTO getBookingById(Long id) {
        Booking booking = findBookingOrThrow(id);
        return BookingDTO.fromEntity(booking);
    }

    // ─── READ (By User) ───────────────────────────────────────────────────────

    /**
     * Retrieve all bookings belonging to a specific user.
     */
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId)
            .stream()
            .map(BookingDTO::fromEntity)
            .collect(Collectors.toList());
    }

    // ─── READ (By Property) ───────────────────────────────────────────────────

    /**
     * Retrieve all bookings for a specific property.
     */
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByProperty(Long propertyId) {
        return bookingRepository.findByPropertyId(propertyId)
            .stream()
            .map(BookingDTO::fromEntity)
            .collect(Collectors.toList());
    }

    // ─── UPDATE ───────────────────────────────────────────────────────────────

    /**
     * Update an existing booking's details.
     */
    public BookingDTO updateBooking(Long id, BookingDTO dto) {
        Booking existing = findBookingOrThrow(id);

        validateBookingDates(dto);
        checkForOverlappingBookings(dto.getPropertyId(),
            LocalDate.parse(dto.getCheckInDate()),
            LocalDate.parse(dto.getCheckOutDate()),
            id);

        // Update fields (encapsulated via setters)
        existing.setPropertyId(dto.getPropertyId());
        existing.setUserId(dto.getUserId());
        existing.setUserName(dto.getUserName());
        existing.setUserEmail(dto.getUserEmail());
        existing.setUserPhone(dto.getUserPhone());
        existing.setPropertyTitle(dto.getPropertyTitle());
        existing.setCheckInDate(LocalDate.parse(dto.getCheckInDate()));
        existing.setCheckOutDate(LocalDate.parse(dto.getCheckOutDate()));
        existing.setTotalPrice(dto.getTotalPrice());
        existing.setNotes(dto.getNotes());

        if (dto.getStatus() != null) {
            existing.setStatus(Booking.BookingStatus.valueOf(dto.getStatus()));
        }

        Booking updated = bookingRepository.save(existing);
        return BookingDTO.fromEntity(updated);
    }

    // ─── UPDATE STATUS only ───────────────────────────────────────────────────

    /**
     * Update only the status of a booking (confirm, cancel, complete).
     */
    public BookingDTO updateBookingStatus(Long id, String status) {
        Booking booking = findBookingOrThrow(id);
        try {
            booking.setStatus(Booking.BookingStatus.valueOf(status.toUpperCase()));
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid status: " + status +
                ". Valid values: PENDING, CONFIRMED, CANCELLED, COMPLETED");
        }
        return BookingDTO.fromEntity(bookingRepository.save(booking));
    }

    // ─── DELETE ───────────────────────────────────────────────────────────────

    /**
     * Delete a booking permanently by ID.
     */
    public void deleteBooking(Long id) {
        findBookingOrThrow(id); // ensures it exists before deleting
        bookingRepository.deleteById(id);
    }

    // ─── Private helper methods (Encapsulation) ───────────────────────────────

    /** Find booking or throw a clear error */
    private Booking findBookingOrThrow(Long id) {
        return bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found with id: " + id));
    }

    /** Validate check-in is before check-out and both are not in the past */
    private void validateBookingDates(BookingDTO dto) {
        LocalDate checkIn  = LocalDate.parse(dto.getCheckInDate());
        LocalDate checkOut = LocalDate.parse(dto.getCheckOutDate());

        if (!checkIn.isBefore(checkOut)) {
            throw new RuntimeException("Check-in date must be before check-out date.");
        }
        if (checkIn.isBefore(LocalDate.now())) {
            throw new RuntimeException("Check-in date cannot be in the past.");
        }
    }

    /** Prevent double bookings on same property for overlapping dates */
    private void checkForOverlappingBookings(Long propertyId,
                                              LocalDate checkIn,
                                              LocalDate checkOut,
                                              Long excludeBookingId) {
        List<Booking> overlapping = bookingRepository
            .findOverlappingBookings(propertyId, checkIn, checkOut);

        // On update, exclude the current booking from the overlap check
        if (excludeBookingId != null) {
            overlapping = overlapping.stream()
                .filter(b -> !b.getId().equals(excludeBookingId))
                .collect(Collectors.toList());
        }

        if (!overlapping.isEmpty()) {
            throw new RuntimeException(
                "Property is already booked for the selected dates.");
        }
    }

    /** Map DTO to a new Booking entity */
    private Booking mapToEntity(BookingDTO dto) {
        return new Booking(
            dto.getPropertyId(),
            dto.getUserId(),
            dto.getUserName(),
            dto.getUserEmail(),
            dto.getUserPhone(),
            dto.getPropertyTitle(),
            LocalDate.parse(dto.getCheckInDate()),
            LocalDate.parse(dto.getCheckOutDate()),
            dto.getTotalPrice(),
            dto.getNotes()
        );
    }
}
