package com.real_estate_web.backend.foq;

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

    @GetMapping("/public")
    public ResponseEntity<List<FAQDTO>> getActiveFAQs() {
        return ResponseEntity.ok(faqService.getActiveFAQs());
    }

    @GetMapping("/public/category")
    public ResponseEntity<List<FAQDTO>> getFAQsByCategory(@RequestParam String name) {
        return ResponseEntity.ok(faqService.getFAQsByCategory(name));
    }

    @GetMapping("/public/search")
    public ResponseEntity<List<FAQDTO>> searchFAQs(@RequestParam String keyword) {
        return ResponseEntity.ok(faqService.searchFAQs(keyword));
    }

    @GetMapping("/public/categories")
    public ResponseEntity<List<String>> getCategories() {
        return ResponseEntity.ok(faqService.getAllCategories());
    }

    @GetMapping("/admin")
    public ResponseEntity<List<FAQDTO>> getAllFAQs() {
        return ResponseEntity.ok(faqService.getAllFAQs());
    }

    @GetMapping("/admin/{id}")
    public ResponseEntity<FAQDTO> getFAQById(@PathVariable Long id) {
        return ResponseEntity.ok(faqService.getFAQById(id));
    }

    @PostMapping("/admin")
    public ResponseEntity<FAQDTO> createFAQ(@Valid @RequestBody FAQDTO faqDTO) {
        FAQDTO created = faqService.createFAQ(faqDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/admin/{id}")
    public ResponseEntity<FAQDTO> updateFAQ(
            @PathVariable Long id,
            @Valid @RequestBody FAQDTO faqDTO) {
        return ResponseEntity.ok(faqService.updateFAQ(id, faqDTO));
    }

    @PatchMapping("/admin/{id}/toggle")
    public ResponseEntity<FAQDTO> toggleStatus(@PathVariable Long id) {
        return ResponseEntity.ok(faqService.toggleFAQStatus(id));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Map<String, String>> deleteFAQ(@PathVariable Long id) {
        faqService.deleteFAQ(id);
        return ResponseEntity.ok(Map.of("message", "FAQ deleted successfully"));
    }
}