package com.real_estate_web.backend.booking;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // ─── CREATE ───────────────────────────────────────────────────────────────

    public BookingDTO createBooking(BookingDTO dto) {
        validateBookingDates(dto);
        checkForOverlappingBookings(
            dto.getPropertyId(),
            LocalDate.parse(dto.getCheckInDate()),
            LocalDate.parse(dto.getCheckOutDate()),
            null
        );
        Booking booking = mapToEntity(dto);
        Booking saved   = bookingRepository.save(booking);
        return BookingDTO.fromEntity(saved);
    }

    // ─── READ ─────────────────────────────────────────────────────────────────

    @Transactional(readOnly = true)
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll()
            .stream()
            .map(BookingDTO::fromEntity)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public BookingDTO getBookingById(Long id) {
        return BookingDTO.fromEntity(findBookingOrThrow(id));
    }

    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId)
            .stream()
            .map(BookingDTO::fromEntity)
            .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByProperty(Long propertyId) {
        return bookingRepository.findByPropertyId(propertyId)
            .stream()
            .map(BookingDTO::fromEntity)
            .collect(Collectors.toList());
    }

    // ─── UPDATE ───────────────────────────────────────────────────────────────

    public BookingDTO updateBooking(Long id, BookingDTO dto) {
        Booking existing = findBookingOrThrow(id);

        validateBookingDates(dto);
        checkForOverlappingBookings(
            dto.getPropertyId(),
            LocalDate.parse(dto.getCheckInDate()),
            LocalDate.parse(dto.getCheckOutDate()),
            id
        );

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

        return BookingDTO.fromEntity(bookingRepository.save(existing));
    }

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

    public void deleteBooking(Long id) {
        findBookingOrThrow(id);
        bookingRepository.deleteById(id);
    }

    // ─── PRIVATE HELPERS ──────────────────────────────────────────────────────

    private Booking findBookingOrThrow(Long id) {
        return bookingRepository.findById(id)
            .orElseThrow(() -> new BookingNotFoundException(
                "Booking not found with id: " + id));
    }

    private void validateBookingDates(BookingDTO dto) {
        LocalDate checkIn  = LocalDate.parse(dto.getCheckInDate());
        LocalDate checkOut = LocalDate.parse(dto.getCheckOutDate());

        if (!checkIn.isBefore(checkOut)) {
            throw new IllegalArgumentException(
                "Check-in date must be before check-out date.");
        }
        if (checkIn.isBefore(LocalDate.now())) {
            throw new IllegalArgumentException(
                "Check-in date cannot be in the past.");
        }
    }

    private void checkForOverlappingBookings(Long propertyId,
                                              LocalDate checkIn,
                                              LocalDate checkOut,
                                              Long excludeBookingId) {
        List<Booking> overlapping = bookingRepository
            .findOverlappingBookings(propertyId, checkIn, checkOut);

        if (excludeBookingId != null) {
            overlapping = overlapping.stream()
                .filter(b -> !b.getId().equals(excludeBookingId))
                .collect(Collectors.toList());
        }

        if (!overlapping.isEmpty()) {
            throw new IllegalStateException(
                "Property is already booked for the selected dates.");
        }
    }

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

    // ─── Custom exception ─────────────────────────────────────────────────────

    public static class BookingNotFoundException extends RuntimeException {
        public BookingNotFoundException(String message) { super(message); }
    }
}