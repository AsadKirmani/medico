package com.example.medico.security.services;

import com.example.medico.models.Medicine;
import com.example.medico.repository.MedicineRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class MedicineService {
    @Autowired
    private MedicineRepository medicineRepository;

    public List<Medicine> allMedicines() {
    return medicineRepository.findAll();
    }
    public Optional<Medicine> singleMedicine(String medId) {
        return medicineRepository.findMedicineByMedId(medId);
    }
    public Medicine newMedicine(@RequestBody Medicine newMedicine) {
        return medicineRepository.save(newMedicine);
    }
}
