package com.everglow.backend.bookings;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Autowired
    public BookingServiceImpl(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    // ─── CREATE ────────────────────────────────────────────────────────────────

    @Override
    public BookingDTO createBooking(BookingDTO bookingDTO) {
        validateBookingDates(bookingDTO);
        checkAvailability(bookingDTO.getPropertyId(),
                          bookingDTO.getCheckInDate(),
                          bookingDTO.getCheckOutDate(),
                          null);

        Booking booking = bookingDTO.toEntity();
        booking.setStatus(Booking.BookingStatus.PENDING);
        Booking saved = bookingRepository.save(booking);
        return new BookingDTO(saved);
    }

    // ─── READ ──────────────────────────────────────────────────────────────────

    @Override
    @Transactional(readOnly = true)
    public BookingDTO getBookingById(Long id) {
        Booking booking = findBookingOrThrow(id);
        return new BookingDTO(booking);
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(BookingDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByUser(Long userId) {
        return bookingRepository.findByUserId(userId)
                .stream()
                .map(BookingDTO::new)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<BookingDTO> getBookingsByProperty(Long propertyId) {
        return bookingRepository.findByPropertyId(propertyId)
                .stream()
                .map(BookingDTO::new)
                .collect(Collectors.toList());
    }

    // ─── UPDATE ────────────────────────────────────────────────────────────────

    @Override
    public BookingDTO updateBooking(Long id, BookingDTO bookingDTO) {
        Booking existing = findBookingOrThrow(id);

        if (existing.getStatus() == Booking.BookingStatus.CANCELLED) {
            throw new IllegalStateException("Cannot update a cancelled booking.");
        }

        validateBookingDates(bookingDTO);
        checkAvailability(bookingDTO.getPropertyId(),
                          bookingDTO.getCheckInDate(),
                          bookingDTO.getCheckOutDate(),
                          id);

        existing.setPropertyId(bookingDTO.getPropertyId());
        existing.setCheckInDate(bookingDTO.getCheckInDate());
        existing.setCheckOutDate(bookingDTO.getCheckOutDate());
        existing.setTotalPrice(bookingDTO.getTotalPrice());
        existing.setGuests(bookingDTO.getGuests());
        existing.setSpecialRequests(bookingDTO.getSpecialRequests());

        Booking updated = bookingRepository.save(existing);
        return new BookingDTO(updated);
    }

    @Override
    public BookingDTO updateBookingStatus(Long id, String status) {
        Booking booking = findBookingOrThrow(id);
        booking.setStatus(Booking.BookingStatus.valueOf(status.toUpperCase()));
        return new BookingDTO(bookingRepository.save(booking));
    }

    // ─── DELETE ────────────────────────────────────────────────────────────────

    @Override
    public void deleteBooking(Long id) {
        Booking booking = findBookingOrThrow(id);
        bookingRepository.delete(booking);
    }

    // ─── PRIVATE HELPERS (OOP encapsulation) ──────────────────────────────────

    private Booking findBookingOrThrow(Long id) {
        return bookingRepository.findById(id)
                .orElseThrow(() -> new BookingNotFoundException("Booking not found with id: " + id));
    }

    private void validateBookingDates(BookingDTO dto) {
        if (dto.getCheckInDate() == null || dto.getCheckOutDate() == null) {
            throw new IllegalArgumentException("Check-in and check-out dates are required.");
        }
        if (!dto.getCheckOutDate().isAfter(dto.getCheckInDate())) {
            throw new IllegalArgumentException("Check-out date must be after check-in date.");
        }
    }

    private void checkAvailability(Long propertyId, java.time.LocalDate checkIn,
                                    java.time.LocalDate checkOut, Long excludeBookingId) {
        List<Booking> overlapping = (excludeBookingId == null)
                ? bookingRepository.findOverlappingBookings(propertyId, checkIn, checkOut)
                : bookingRepository.findOverlappingBookingsExcluding(propertyId, checkIn, checkOut, excludeBookingId);

        if (!overlapping.isEmpty()) {
            throw new IllegalStateException("Property is not available for the selected dates.");
        }
    }
}
