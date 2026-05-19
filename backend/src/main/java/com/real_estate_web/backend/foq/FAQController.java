package com.real_estate_web.backend.foq;

import com.real_estate_web.backend.dto.*;      
import com.real_estate_web.backend.service.*;  
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/faqs")
@CrossOrigin(origins = "*")
public class FAQController {

    private final FAQService faqService;

    @Autowired
    public FAQController(FAQService faqService) {
        this.faqService = faqService;
    }

    // ─── PUBLIC ENDPOINTS ─────────────────────────────────────────────

    // GET /api/faqs/public — all active FAQs for users
    @GetMapping("/public")
    public ResponseEntity<List<FAQDTO>> getActiveFAQs() {
        return ResponseEntity.ok(faqService.getActiveFAQs());
    }

    // GET /api/faqs/public/category?name=Bookings
    @GetMapping("/public/category")
    public ResponseEntity<List<FAQDTO>> getFAQsByCategory(@RequestParam String name) {
        return ResponseEntity.ok(faqService.getFAQsByCategory(name));
    }

    // GET /api/faqs/public/search?keyword=payment
    @GetMapping("/public/search")
    public ResponseEntity<List<FAQDTO>> searchFAQs(@RequestParam String keyword) {
        return ResponseEntity.ok(faqService.searchFAQs(keyword));
    }

    // GET /api/faqs/public/categories — list all category names
    @GetMapping("/public/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(faqService.getAllCategories());
    }

    // ─── ADMIN ENDPOINTS ──────────────────────────────────────────────

    // GET /api/faqs/admin — all FAQs including inactive
    @GetMapping("/admin")
    public ResponseEntity<List<FAQDTO>> getAllFAQs() {
        return ResponseEntity.ok(faqService.getAllFAQs());
    }

    // GET /api/faqs/admin/{id} — get single FAQ
    @GetMapping("/admin/{id}")
    public ResponseEntity<FAQDTO> getFAQById(@PathVariable Long id) {
        return ResponseEntity.ok(faqService.getFAQById(id));
    }

    // POST /api/faqs/admin — create new FAQ
    @PostMapping("/admin")
    public ResponseEntity<FAQDTO> createFAQ(@Valid @RequestBody FAQDTO faqDTO) {
        FAQDTO created = faqService.createFAQ(faqDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // PUT /api/faqs/admin/{id} — update existing FAQ
    @PutMapping("/admin/{id}")
    public ResponseEntity<FAQDTO> updateFAQ(
            @PathVariable Long id,
            @Valid @RequestBody FAQDTO faqDTO) {
        return ResponseEntity.ok(faqService.updateFAQ(id, faqDTO));
    }

    // PATCH /api/faqs/admin/{id}/toggle — toggle active/inactive
    @PatchMapping("/admin/{id}/toggle")
    public ResponseEntity<FAQDTO> toggleStatus(@PathVariable Long id) {
        return ResponseEntity.ok(faqService.toggleFAQStatus(id));
    }

    // DELETE /api/faqs/admin/{id} — delete FAQ
    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Map<String, String>> deleteFAQ(@PathVariable Long id) {
        faqService.deleteFAQ(id);
        return ResponseEntity.ok(Map.of("message", "FAQ deleted successfully"));
    }
}
