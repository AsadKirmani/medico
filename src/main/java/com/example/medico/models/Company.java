package com.example.medico.models;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "vendors")
public class Company {
    @Id
    private ObjectId id;
    private String Name;
    private String Contact;
    private String Address;
    private String Description;

    public Company() { }
    public Company(String Name, String Contact, String Address, String Description) {
        this.Name = Name;
        this.Contact = Contact;
        this.Address = Address;
        this.Description = Description;
    }
    public ObjectId getId() {
        return id;
    }
    public String getName() {
        return Name;
    }
    public void setName(String Name) {
        this.Name = Name;
    }
    public String getContact() {
        return Contact;
    }
    public void setContact(String Contact) {
        this.Contact = Contact;
    }
    public String getAddress() {
        return Address;
    }
    public void setAddress(String Address) {
        this.Address = Address;
    }
    public String getDescription() {
        return Description;
    }
    public void setDescription(String Description) {
        this.Description = Description;
    }
}

