package com.example.medico.controllers;

import com.example.medico.repository.MedicineRepository;
import com.example.medico.security.services.MedicineService;
import com.example.medico.models.Medicine;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ObjectUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@CrossOrigin(origins = {"http://localhost:3000"})
@RestController
@RequestMapping("api/v1/medicines")
public class MedicineController {
    @Autowired
    private MedicineService medicineService;
    @Autowired
    private MedicineRepository medicineRepository;
    @GetMapping
    public ResponseEntity<List<Medicine>> getAllMedicines() {
     return new ResponseEntity<List<Medicine>>(medicineService.allMedicines(), HttpStatus.OK);
    }

    @GetMapping("/{medId}")
    public ResponseEntity<Optional<Medicine>> getSingleMedicine(@PathVariable String medId) {
        return new ResponseEntity<Optional<Medicine>>(medicineService.singleMedicine(medId), HttpStatus.OK);
    }
    @PutMapping("/{medId}")
    public ResponseEntity<Medicine> updateMedicine(@PathVariable("medId") String medId,@RequestBody Medicine medicine) {
        Optional<Medicine> medicineData = medicineRepository.findMedicineByMedId(medId);
        if (medicineData.isPresent()) {
            Medicine _medicine = medicineData.get();
            if(!StringUtils.isEmpty(medicine.getName())) {
            _medicine.setName(medicine.getName());
            }
            if(!StringUtils.isEmpty(medicine.getExpiryDate())) {
            _medicine.setExpiryDate(medicine.getExpiryDate());
            }
            if(!StringUtils.isEmpty(medicine.getMfgDate())) {
            _medicine.setMfgDate(medicine.getMfgDate());
            }
            if(!StringUtils.isEmpty(medicine.getPrice())) {
            _medicine.setPrice(medicine.getPrice());
            }
            if(!StringUtils.isEmpty(medicine.getDescription())) {
            _medicine.setDescription(medicine.getDescription());
            }
            if(!StringUtils.isEmpty(medicine.getUsage())) {
            _medicine.setUsage(medicine.getUsage());
            }
            if(!StringUtils.isEmpty(medicine.getCompany())) {
            _medicine.setCompany(medicine.getCompany());
            }
            if(!StringUtils.isEmpty(medicine.getGroupName())) {
            _medicine.setGroupName(medicine.getGroupName());
            }
            if(!StringUtils.isEmpty(medicine.getStock())) {
            _medicine.setStock(medicine.getStock());
            }
            if(!ObjectUtils.isEmpty(medicine.getImages())) {
            _medicine.setImages(medicine.getImages());
            }
            return new ResponseEntity<>(medicineRepository.save(_medicine), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping
    public ResponseEntity<Medicine> newMedicine(@RequestBody Medicine newMedicine) {
        return new ResponseEntity<Medicine>(medicineService.newMedicine(newMedicine), HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteMedicine(@PathVariable("id") ObjectId id) {
        try {
            medicineRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
