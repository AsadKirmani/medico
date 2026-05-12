package com.example.medico.controllers;

import com.example.medico.models.Company;
import com.example.medico.models.Stock;
import com.example.medico.repository.StockRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/v1/stock")
public class StockController {
    @Autowired
    StockRepository stockRepository;
    @GetMapping
    public ResponseEntity<List<Stock>> getStock() {
     return  new ResponseEntity<List<Stock>>(stockRepository.findAll(),HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<Stock> createStock(@RequestBody Stock newStock) {
        try {
            Stock _stock = stockRepository.save(new Stock(
                    newStock.getMedicineName(),
                    newStock.getQuantity(),
                    newStock.getDescription()));
            return new ResponseEntity<>(_stock, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PutMapping("/{id}")
    public ResponseEntity<Stock> updateStock(@PathVariable("id") ObjectId id, @RequestBody Stock stock) {
        Optional<Stock> stockData = stockRepository.findById(id);

        if (stockData.isPresent()) {
            Stock _stock = stockData.get();
            _stock.setMedicineName(stock.getMedicineName());
            _stock.setQuantity(stock.getQuantity());
            _stock.setDescription(stock.getDescription());
            return new ResponseEntity<>(stockRepository.save(_stock), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteStock(@PathVariable("id") ObjectId id) {
        try {
            stockRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
