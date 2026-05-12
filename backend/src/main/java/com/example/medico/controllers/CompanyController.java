package com.example.medico.controllers;

import com.example.medico.models.Company;
import com.example.medico.repository.CompanyRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/vendors")
public class CompanyController {
    @Autowired
    private CompanyRepository companyRepository;
    @GetMapping
    public ResponseEntity<List<Company>> getAllMedicines() {
        return new ResponseEntity<List<Company>>(companyRepository.findAll(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Company> createCompany(@RequestBody Company newCompany) {
        try {
            Company _company = companyRepository.save(new Company(
                    newCompany.getName(),
                    newCompany.getContact(),
                    newCompany.getAddress(),
                    newCompany.getDescription()));
            return new ResponseEntity<>(_company, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Company> updateCompany(@PathVariable("id") ObjectId id, @RequestBody Company company) {
        Optional<Company> companyData = companyRepository.findById(id);

        if (companyData.isPresent()) {
            Company _company = companyData.get();
            _company.setName(company.getName());
            _company.setContact(company.getContact());
            _company.setAddress((company.getAddress()));
            _company.setDescription(company.getDescription());
            return new ResponseEntity<>(companyRepository.save(_company), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteCompany(@PathVariable("id") ObjectId id) {
        try {
            companyRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
