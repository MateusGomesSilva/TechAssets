package com.techassets.model;

import java.time.LocalDateTime;

/**
 * Entidade de Ativo de TI para gestão patrimonial.
 */
public class Asset {
    private String tag;
    private String name;
    private String category;
    private String serialNumber;
    private String responsible;
    private String location;
    private AssetStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Asset() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.status = AssetStatus.DISPONIVEL;
    }

    public Asset(String tag, String name, String category, String serialNumber, String responsible, String location, AssetStatus status) {
        this.tag = tag;
        this.name = name;
        this.category = category;
        this.serialNumber = serialNumber;
        this.responsible = responsible;
        this.location = location;
        this.status = status != null ? status : AssetStatus.DISPONIVEL;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters and Setters
    public String getTag() { return tag; }
    public void setTag(String tag) { this.tag = tag; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSerialNumber() { return serialNumber; }
    public void setSerialNumber(String serialNumber) { this.serialNumber = serialNumber; }

    public String getResponsible() { return responsible; }
    public void setResponsible(String responsible) { this.responsible = responsible; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public AssetStatus getStatus() { return status; }
    public void setStatus(AssetStatus status) { 
        this.status = status; 
        this.updatedAt = LocalDateTime.now();
    }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    @Override
    public String toString() {
        return "Asset{" +
                "tag='" + tag + '\'' +
                ", name='" + name + '\'' +
                ", category='" + category + '\'' +
                ", serialNumber='" + serialNumber + '\'' +
                ", responsible='" + responsible + '\'' +
                ", location='" + location + '\'' +
                ", status=" + status +
                '}';
    }
}
