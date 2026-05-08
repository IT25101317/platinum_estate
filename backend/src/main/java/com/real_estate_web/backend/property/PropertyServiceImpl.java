package com.real_estate_web.backend.property;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class PropertyServiceImpl implements PropertyService {

    private final PropertyRepository propertyRepository;

    @Autowired
    public PropertyServiceImpl(PropertyRepository propertyRepository) {
        this.propertyRepository = propertyRepository;
    }

    // ==================== CREATE ====================
    @Override
    public PropertyDTO createProperty(PropertyDTO propertyDTO) {
        Property property = propertyDTO.toEntity();
        Property saved = propertyRepository.save(property);
        return new PropertyDTO(saved);
    }

    // ==================== READ ====================
    @Override
    @Transactional(readOnly = true)
    public PropertyDTO getPropertyById(Long id) {
        Property property = propertyRepository.findById(id)
            .orElseThrow(() -> new PropertyNotFoundException("Property not found with id: " + id));
        return new PropertyDTO(property);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyDTO> getAllProperties() {
        return propertyRepository.findAll()
            .stream()
            .map(PropertyDTO::new)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyDTO> getAvailableProperties() {
        return propertyRepository.findByAvailableTrue()
            .stream()
            .map(PropertyDTO::new)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyDTO> getPropertiesByType(PropertyType type) {
        return propertyRepository.findByPropertyType(type)
            .stream()
            .map(PropertyDTO::new)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyDTO> searchProperties(String keyword) {
        return propertyRepository.searchByKeyword(keyword)
            .stream()
            .map(PropertyDTO::new)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<PropertyDTO> getPropertiesByPriceRange(BigDecimal min, BigDecimal max) {
        return propertyRepository.findByPriceBetween(min, max)
            .stream()
            .map(PropertyDTO::new)
            .collect(Collectors.toList());
    }

    // ==================== UPDATE ====================
    @Override
    public PropertyDTO updateProperty(Long id, PropertyDTO propertyDTO) {
        Property existing = propertyRepository.findById(id)
            .orElseThrow(() -> new PropertyNotFoundException("Property not found with id: " + id));

        // Apply updates using OOP setters
        existing.setTitle(propertyDTO.getTitle());
        existing.setDescription(propertyDTO.getDescription());
        existing.setLocation(propertyDTO.getLocation());
        existing.setPrice(propertyDTO.getPrice());
        existing.setPropertyType(propertyDTO.getPropertyType());
        existing.setBedrooms(propertyDTO.getBedrooms());
        existing.setBathrooms(propertyDTO.getBathrooms());
        existing.setAreaSqFt(propertyDTO.getAreaSqFt());
        existing.setAvailable(propertyDTO.isAvailable());
        existing.setImageUrl(propertyDTO.getImageUrl());

        Property updated = propertyRepository.save(existing);
        return new PropertyDTO(updated);
    }

    @Override
    public PropertyDTO toggleAvailability(Long id) {
        Property property = propertyRepository.findById(id)
            .orElseThrow(() -> new PropertyNotFoundException("Property not found with id: " + id));
        property.setAvailable(!property.isAvailable());
        return new PropertyDTO(propertyRepository.save(property));
    }

    // ==================== DELETE ====================
    @Override
    public void deleteProperty(Long id) {
        if (!propertyRepository.existsById(id)) {
            throw new PropertyNotFoundException("Property not found with id: " + id);
        }
        propertyRepository.deleteById(id);
    }
}
