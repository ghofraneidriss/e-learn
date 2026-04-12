package tn.esprit.evaluation.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "COURS")
public interface CoursClient {

    @GetMapping("/cours/{id}")
    Object getCourseById(@PathVariable("id") Long id);
}
