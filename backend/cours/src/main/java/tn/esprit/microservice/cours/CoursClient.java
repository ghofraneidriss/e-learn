package tn.esprit.microservice.cours;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
@FeignClient(name = "cours-service", url = "http://localhost:8081")
public interface CoursClient {

    @GetMapping("/cours/{id}")
    Cours getCoursById(@PathVariable Long id);

}
