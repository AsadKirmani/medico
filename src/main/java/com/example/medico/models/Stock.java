package com.example.medico.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "stock")
public class Stock {
    @Id
    private ObjectId id;
    private String medicineName;
    private Integer quantity;
    private String description;
    public Stock() { }
    public Stock(String medicineName, Integer quantity, String description) {
        this.medicineName = medicineName;
        this.quantity = quantity;
        this. description = description;
    }
    public ObjectId getId() {
        return id;
    }
    public String getMedicineName() {
        return medicineName;
    }
    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }
    public Integer getQuantity() {
        return quantity;
    }
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
}
