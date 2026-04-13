package tn.esprit.microservice.evenement.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.microservice.evenement.Entity.Evenement;
import tn.esprit.microservice.evenement.Service.EvenementService;

import java.util.List;

@RestController
@RequestMapping("/api/events")
public class EvenementRestApi {

    @Autowired
    private EvenementService service;

    // ----- Côté Utilisateur / Tous -----

    @GetMapping
    public ResponseEntity<List<Evenement>> getFuturEvents() {
        return ResponseEntity.ok(service.getAllFuturEvents());
    }

    @PostMapping("/{id}/registerUser")
    public ResponseEntity<String> registerUser(@PathVariable Long id, @RequestParam Long userId) {
        // En production, userId devrait être extrait du token JWT lié à la requête (Principal/Keycloak)
        try {
            service.registerUser(id, userId);
            return ResponseEntity.ok("Inscription réussie pour l'utilisateur : " + userId);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/{id}/unregisterUser")
    public ResponseEntity<String> unregisterUser(@PathVariable Long id, @RequestParam Long userId) {
        try {
            service.unregisterUser(id, userId);
            return ResponseEntity.ok("Désinscription réussie pour l'utilisateur : " + userId);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    // ----- Côté Admin -----

    // L'ApiGateway s'assure déjà que seul l'Admin accède ici
    @PostMapping
    public ResponseEntity<Evenement> createEvenement(@RequestBody Evenement evenement) {
        try {
            Evenement created = service.createEvenement(evenement);
            return ResponseEntity.ok(created);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Evenement> updateEvenement(@PathVariable Long id, @RequestBody Evenement evenement) {
        try {
            Evenement updated = service.updateEvenement(id, evenement);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvenement(@PathVariable Long id) {
        service.deleteEvenement(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/participants")
    public ResponseEntity<List<Long>> getParticipants(@PathVariable Long id) {
        try {
            List<Long> participants = service.getParticipants(id);
            return ResponseEntity.ok(participants);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
