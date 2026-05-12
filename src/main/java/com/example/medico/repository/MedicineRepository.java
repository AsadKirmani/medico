package com.example.medico.repository;

import com.example.medico.models.Medicine;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicineRepository extends MongoRepository<Medicine, ObjectId> {
    Optional<Medicine> findMedicineByMedId(String medId);
}
