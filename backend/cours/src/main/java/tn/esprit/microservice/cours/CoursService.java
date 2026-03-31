package tn.esprit.microservice.cours;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CoursService {

    private final CoursClient coursClient;

    public Cours getCoursById(Long id) {
        return coursClient.getCoursById(id);
    }
    @Autowired
    private CoursRepository coursRepository;

    public Cours createCours(Cours cours) {
        cours.setCreated_at(new Date());
        return coursRepository.save(cours);
    }

    public List<Cours> getAllCours() {
       return coursRepository.findAll();
    }

   /* public Cours getCoursById(Long id) {
        return coursRepository.findById(id).orElse(null);
    }*/

    public Cours updateCours(Long id, Cours coursDetails) {
        return coursRepository.findById(id).map(cours -> {
            cours.setTitle(coursDetails.getTitle());
            cours.setDescription(coursDetails.getDescription());
            cours.setCover(coursDetails.getCover());
            cours.setVideo(coursDetails.getVideo());
            cours.setCategory(coursDetails.getCategory());
            cours.setLanguage(coursDetails.getLanguage());
            cours.setLevel(coursDetails.getLevel());
            cours.setPrice(coursDetails.getPrice());
            cours.setDuration(coursDetails.getDuration());
            cours.setInstructor(coursDetails.getInstructor());
            cours.setUpdated_at(new Date());
            cours.setStatus(coursDetails.getStatus());
            return coursRepository.save(cours);
        }).orElse(null);
    }

    public boolean deleteCours(Long id) {
        if (coursRepository.existsById(id)) {
            coursRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
