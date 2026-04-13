package com.learning.quiz.controller;

import com.learning.quiz.dto.OffreDTO;
import com.learning.quiz.service.OffreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/offres")
@RequiredArgsConstructor
public class OffreController {

    private final OffreService offreService;

    /** Offres actives — visible to all authenticated users */
    @GetMapping
    public ResponseEntity<List<OffreDTO.Response>> getOffresActives() {
        return ResponseEntity.ok(offreService.getOffresActives());
    }

    /** All offres including inactive — admin/enseignant only */
    @GetMapping("/all")
    @PreAuthorize("hasAnyRole('ENSEIGNANT', 'ADMIN')")
    public ResponseEntity<List<OffreDTO.Response>> getAllOffres() {
        return ResponseEntity.ok(offreService.getAllOffres());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OffreDTO.Response> getOffre(@PathVariable Long id) {
        return ResponseEntity.ok(offreService.getOffre(id));
    }

    @GetMapping("/mes-offres")
    @PreAuthorize("hasAnyRole('ENSEIGNANT', 'ADMIN')")
    public ResponseEntity<List<OffreDTO.Response>> getMesOffres(Principal principal) {
        return ResponseEntity.ok(offreService.getMesOffres(principal.getName()));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ENSEIGNANT', 'ADMIN')")
    public ResponseEntity<OffreDTO.Response> createOffre(
            @Valid @RequestBody OffreDTO.Request request,
            Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(offreService.createOffre(request, principal.getName()));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ENSEIGNANT', 'ADMIN')")
    public ResponseEntity<OffreDTO.Response> updateOffre(
            @PathVariable Long id,
            @Valid @RequestBody OffreDTO.Request request,
            Principal principal) {
        return ResponseEntity.ok(offreService.updateOffre(id, request, principal.getName()));
    }

    @PatchMapping("/{id}/toggle-actif")
    @PreAuthorize("hasAnyRole('ENSEIGNANT', 'ADMIN')")
    public ResponseEntity<Void> toggleActif(@PathVariable Long id, Principal principal) {
        offreService.toggleActif(id, principal.getName());
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ENSEIGNANT', 'ADMIN')")
    public ResponseEntity<Void> deleteOffre(@PathVariable Long id, Principal principal) {
        offreService.deleteOffre(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
