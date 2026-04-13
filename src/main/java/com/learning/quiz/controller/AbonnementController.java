package com.learning.quiz.controller;

import com.learning.quiz.dto.AbonnementDTO;
import com.learning.quiz.service.AbonnementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/abonnements")
@RequiredArgsConstructor
public class AbonnementController {

    private final AbonnementService abonnementService;

    /** Student's own subscriptions */
    @GetMapping("/mes-abonnements")
    public ResponseEntity<List<AbonnementDTO.Response>> getMesAbonnements(Principal principal) {
        return ResponseEntity.ok(abonnementService.getMesAbonnements(principal.getName()));
    }

    /** All subscriptions — admin only */
    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<AbonnementDTO.Response>> getAllAbonnements() {
        return ResponseEntity.ok(abonnementService.getAllAbonnements());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AbonnementDTO.Response> getAbonnement(@PathVariable Long id) {
        return ResponseEntity.ok(abonnementService.getAbonnement(id));
    }

    /** Subscribe to an offre — students */
    @PostMapping
    @PreAuthorize("hasRole('ETUDIANT')")
    public ResponseEntity<AbonnementDTO.Response> souscrire(
            @Valid @RequestBody AbonnementDTO.Request request,
            Principal principal) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(abonnementService.souscrire(request, principal.getName()));
    }

    /** Cancel a subscription */
    @PatchMapping("/{id}/annuler")
    public ResponseEntity<Void> annuler(@PathVariable Long id, Principal principal) {
        abonnementService.annuler(id, principal.getName());
        return ResponseEntity.noContent().build();
    }
}
