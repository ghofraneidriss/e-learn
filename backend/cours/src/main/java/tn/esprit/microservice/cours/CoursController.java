package tn.esprit.microservice.cours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cours")
public class CoursController {

    @Autowired
    private CoursService coursService;

    @PostMapping
    public ResponseEntity<Cours> createCours(@RequestBody Cours cours) {
        return new ResponseEntity<>(coursService.createCours(cours), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<Cours>> getAllCours() {
        return new ResponseEntity<>(coursService.getAllCours(), HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cours> getCoursById(@PathVariable Long id) {
        Cours cours = coursService.getCoursById(id);
        return cours != null ? new ResponseEntity<>(cours, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cours> updateCours(@PathVariable Long id, @RequestBody Cours coursDetails) {
        Cours updatedCours = coursService.updateCours(id, coursDetails);
        return updatedCours != null ? new ResponseEntity<>(updatedCours, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCours(@PathVariable Long id) {
        return coursService.deleteCours(id) ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
