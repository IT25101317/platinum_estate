package com.everglow.backend.property;

import java.math.BigDecimal;
import java.util.List;

public interface PropertyService {

    // CREATE
    PropertyDTO createProperty(PropertyDTO propertyDTO);

    // READ
    PropertyDTO getPropertyById(Long id);
    List<PropertyDTO> getAllProperties();
    List<PropertyDTO> getAvailableProperties();
    List<PropertyDTO> getPropertiesByType(PropertyType type);
    List<PropertyDTO> searchProperties(String keyword);
    List<PropertyDTO> getPropertiesByPriceRange(BigDecimal min, BigDecimal max);

    // UPDATE
    PropertyDTO updateProperty(Long id, PropertyDTO propertyDTO);
    PropertyDTO toggleAvailability(Long id);

    // DELETE
    void deleteProperty(Long id);
}
