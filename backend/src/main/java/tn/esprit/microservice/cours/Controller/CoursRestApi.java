package tn.esprit.microservice.cours.Controller;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/cours")
public class CoursRestApi {

    @GetMapping("/{id}")
    public Object getCourseById(@PathVariable("id") Long id) {
        // Return structured JSON so OpenFeign can decode it reliably.
        return Map.of(
                "id", id,
                "name", "Cours de Test (Microservice Backend)"
        );
    }

    @GetMapping
    public String getHello() {
        return "Service Cours est en ligne !";
    }
}
