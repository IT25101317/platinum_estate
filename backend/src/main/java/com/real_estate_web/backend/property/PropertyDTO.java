package com.real_estate_web.backend.property;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

public class PropertyDTO {

    private Long id;

    @NotBlank(message = "Title is required")
    @Size(min = 3, max = 100)
    private String title;

    @NotBlank(message = "Description is required")
    private String description;

    @NotBlank(message = "Location is required")
    private String location;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.0", inclusive = false)
    private BigDecimal price;

    @NotNull(message = "Property type is required")
    private PropertyType propertyType;

    @Min(0)
    private int bedrooms;

    @Min(0)
    private int bathrooms;

    @Min(0)
    private double areaSqFt;

    private boolean available;

    private String imageUrl;

    // --- Default Constructor ---
    public PropertyDTO() {}

    // --- Constructor from Entity (for responses) ---
    public PropertyDTO(Property property) {
        this.id = property.getId();
        this.title = property.getTitle();
        this.description = property.getDescription();
        this.location = property.getLocation();
        this.price = property.getPrice();
        this.propertyType = property.getPropertyType();
        this.bedrooms = property.getBedrooms();
        this.bathrooms = property.getBathrooms();
        this.areaSqFt = property.getAreaSqFt();
        this.available = property.isAvailable();
        this.imageUrl = property.getImageUrl();
    }

    // --- Convert DTO to Entity ---
    public Property toEntity() {
        return new Property(
            this.title, this.description, this.location,
            this.price, this.propertyType,
            this.bedrooms, this.bathrooms, this.areaSqFt,
            this.available, this.imageUrl
        );
    }

    // --- Getters & Setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public BigDecimal getPrice() { return price; }
    public void setPrice(BigDecimal price) { this.price = price; }

    public PropertyType getPropertyType() { return propertyType; }
    public void setPropertyType(PropertyType propertyType) { this.propertyType = propertyType; }

    public int getBedrooms() { return bedrooms; }
    public void setBedrooms(int bedrooms) { this.bedrooms = bedrooms; }

    public int getBathrooms() { return bathrooms; }
    public void setBathrooms(int bathrooms) { this.bathrooms = bathrooms; }

    public double getAreaSqFt() { return areaSqFt; }
    public void setAreaSqFt(double areaSqFt) { this.areaSqFt = areaSqFt; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
