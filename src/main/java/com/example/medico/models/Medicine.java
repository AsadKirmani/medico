package com.example.medico.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;

@Document(collection = "medicines")
public class Medicine {
    @Id
    private ObjectId id;
    private String name;
    private String expiryDate;
    private String mfgDate;
    private String price;
    private String description;
    private String usage;
    private String medId;
    private String company;
    private String groupName;
    private String stock;
    private  ArrayList<String> images = new ArrayList<String>();
    public Medicine() {

    }
    public Medicine(ObjectId id,
                    String name,
                    String expiryDate,
                    String mfgDate,
                    String price,
                    String description,
                    String usage,
                    String medId,
                    String company,
                    String groupName,
                    String stock,
                    ArrayList images) {
        this.id = id;
        this.name = name;
        this.expiryDate = expiryDate;
        this.mfgDate = mfgDate;
        this.price= price;
        this.description = description;
        this.usage = usage;
        this.medId = medId;
        this.company = company;
        this.groupName = groupName;
        this.stock = stock;
        this.images = images;
    }
    public ObjectId getId() {
    return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getExpiryDate() {
        return expiryDate;
    }
    public void setExpiryDate(String expiryDate) {
        this.expiryDate = expiryDate;
    }
    public String getMfgDate() {
        return mfgDate;
    }
    public void setMfgDate(String mfgDate) {
        this.mfgDate = mfgDate;
    }
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public String getUsage() {
        return usage;
    }
    public void setUsage(String usage) {
        this.usage = usage;
    }
    public String getMedId() {
        return medId;
    }
    public void setMedId(String medId) {
        this.medId = medId;
    }
    public String getCompany() {
        return company;
    }
    public void setCompany(String company) {
        this.company = company;
    }
    public String getGroupName() {
        return groupName;
    }
    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }
    public String getStock() {
        return stock;
    }
    public void setStock(String stock) {
        this.stock = stock;
    }
    public ArrayList getImages() {
        return images;
    }
    public void setImages(ArrayList images) {
        this.images = images;
    }

}
