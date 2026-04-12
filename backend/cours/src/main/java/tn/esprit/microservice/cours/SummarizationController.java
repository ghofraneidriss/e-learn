package tn.esprit.microservice.cours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/summarize")
public class SummarizationController {

    @Autowired
    private SummarizationService service;

    @PostMapping
    public ResponseEntity<String> summarize(@RequestBody String text) throws Exception {
        return ResponseEntity.ok(service.summarize(text));
    }
}
