package tn.esprit.apigateway.controller;

import java.net.URI;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SwaggerController {

    @GetMapping("/swagger-ui/index.html")
    public ResponseEntity<Void> swaggerCentralPage() {
        return ResponseEntity.status(HttpStatus.FOUND)
                .location(URI.create("/webjars/swagger-ui/index.html?configUrl=/swagger-config"))
                .build();
    }

    @GetMapping("/swagger-config")
    public Map<String, Object> swaggerConfig() {
        return Map.of(
                "urls", List.of(
                        Map.of("name", "Cours service", "url", "/cours/v3/api-docs"),
                        Map.of("name", "Evaluation service", "url", "/evaluation/v3/api-docs")
                ),
                "urls.primaryName", "Cours service"
        );
    }
}
