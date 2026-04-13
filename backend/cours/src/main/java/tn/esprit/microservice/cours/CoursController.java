package tn.esprit.microservice.cours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/cours")
public class CoursController {

    private CoursRepository coursRepository;
    private Upload uploadservice;
    private ImageStorageService imageService;
    private VideoStorageService videoService;

    @GetMapping("/health")
    public String health() {
        return "Cours Service is UP";
    }

    @Autowired
    private CoursService coursService;

    @PostMapping
    public ResponseEntity<Cours> createCours(@RequestBody Cours cours) {
        return new ResponseEntity<>(coursService.createCours(cours), HttpStatus.CREATED);
    }

    @GetMapping
    public List<Cours> getAllCours() {
        return coursService.getAllCours();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cours> getCours(@PathVariable Long id) {
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
    @GetMapping("/search")
    public List<Cours> search(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String category,
            @RequestParam(required = false) Level level) {

        return coursRepository.findByFilters(title, category, level);
    }
    @GetMapping("/page")
    public Page<Cours> getPage(@RequestParam int page, @RequestParam int size) {
        return coursRepository.findAll(PageRequest.of(page, size));
    }
    @GetMapping("/top")
    public List<Cours> topCourses() {
        return coursRepository.findTop5RecentCourses();
    }
    @PutMapping("/{id}/status")
    public Cours updateStatus(@PathVariable Long id, @RequestParam Status status) {
        Cours c = coursRepository.findById(id).get();
        c.setStatus(status);
        return coursRepository.save(c);
    }

    @PostMapping("/{id}/upload-image")
    public String uploadImage(@PathVariable Long id,
                              @RequestParam("file") MultipartFile file) throws IOException {

        String fileName = imageService.save(file);

        Cours c = coursRepository.findById(id).orElseThrow();
        c.setCover(fileName);
        coursRepository.save(c);

        return fileName;
    }
    @PostMapping("/{id}/upload-video")
    public String uploadVideo(@PathVariable Long id,
                              @RequestParam("file") MultipartFile file) throws IOException {

        String fileName = videoService.save(file);

        Cours c = coursRepository.findById(id).orElseThrow();
        c.setVideo(fileName);
        coursRepository.save(c);

        return fileName;
    }
}
