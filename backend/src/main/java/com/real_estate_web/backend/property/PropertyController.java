package com.everglow.backend.property;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "http://localhost:5173")
public class PropertyController {

    private final PropertyService propertyService;

    @Autowired
    public PropertyController(PropertyService propertyService) {
        this.propertyService = propertyService;
    }

    // ==================== CREATE ====================
    // POST /api/properties
    @PostMapping
    public ResponseEntity<PropertyDTO> createProperty(@Valid @RequestBody PropertyDTO propertyDTO) {
        PropertyDTO created = propertyService.createProperty(propertyDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    // ==================== READ ====================
    // GET /api/properties
    @GetMapping
    public ResponseEntity<List<PropertyDTO>> getAllProperties() {
        return ResponseEntity.ok(propertyService.getAllProperties());
    }

    // GET /api/properties/{id}
    @GetMapping("/{id}")
    public ResponseEntity<PropertyDTO> getPropertyById(@PathVariable Long id) {
        return ResponseEntity.ok(propertyService.getPropertyById(id));
    }

    // GET /api/properties/available
    @GetMapping("/available")
    public ResponseEntity<List<PropertyDTO>> getAvailableProperties() {
        return ResponseEntity.ok(propertyService.getAvailableProperties());
    }

    // GET /api/properties/type/{type}
    @GetMapping("/type/{type}")
    public ResponseEntity<List<PropertyDTO>> getByType(@PathVariable PropertyType type) {
        return ResponseEntity.ok(propertyService.getPropertiesByType(type));
    }

    // GET /api/properties/search?keyword=beach
    @GetMapping("/search")
    public ResponseEntity<List<PropertyDTO>> search(@RequestParam String keyword) {
        return ResponseEntity.ok(propertyService.searchProperties(keyword));
    }

    // GET /api/properties/price-range?min=100000&max=500000
    @GetMapping("/price-range")
    public ResponseEntity<List<PropertyDTO>> getByPriceRange(
            @RequestParam BigDecimal min,
            @RequestParam BigDecimal max) {
        return ResponseEntity.ok(propertyService.getPropertiesByPriceRange(min, max));
    }

    // ==================== UPDATE ====================
    // PUT /api/properties/{id}
    @PutMapping("/{id}")
    public ResponseEntity<PropertyDTO> updateProperty(
            @PathVariable Long id,
            @Valid @RequestBody PropertyDTO propertyDTO) {
        return ResponseEntity.ok(propertyService.updateProperty(id, propertyDTO));
    }

    // PATCH /api/properties/{id}/toggle-availability
    @PatchMapping("/{id}/toggle-availability")
    public ResponseEntity<PropertyDTO> toggleAvailability(@PathVariable Long id) {
        return ResponseEntity.ok(propertyService.toggleAvailability(id));
    }

    // ==================== DELETE ====================
    // DELETE /api/properties/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return ResponseEntity.noContent().build();
    }
}
