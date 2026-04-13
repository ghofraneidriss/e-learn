package com.learning.quiz.service;

import com.learning.quiz.client.NotificationClient;
import com.learning.quiz.client.NotificationRequest;
import com.learning.quiz.dto.AbonnementDTO;
import com.learning.quiz.messaging.AbonnementEvent;
import com.learning.quiz.messaging.AbonnementEventPublisher;
import com.learning.quiz.model.Abonnement;
import com.learning.quiz.model.Offre;
import com.learning.quiz.model.User;
import com.learning.quiz.repository.AbonnementRepository;
import com.learning.quiz.repository.OffreRepository;
import com.learning.quiz.security.UserProviderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AbonnementService {

    private final AbonnementRepository abonnementRepository;
    private final OffreRepository offreRepository;
    private final UserProviderService userProviderService;
    private final AbonnementEventPublisher eventPublisher;
    private final NotificationClient notificationClient;

    public List<AbonnementDTO.Response> getMesAbonnements(String email) {
        User user = userProviderService.getOrCreate(email);
        return abonnementRepository.findByUserId(user.getId()).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<AbonnementDTO.Response> getAllAbonnements() {
        return abonnementRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public AbonnementDTO.Response getAbonnement(Long id) {
        return toResponse(findById(id));
    }

    @Transactional
    public AbonnementDTO.Response souscrire(AbonnementDTO.Request request, String userEmail) {
        User user = userProviderService.getOrCreate(userEmail);
        Offre offre = offreRepository.findByIdWithCreateur(request.getOffreId())
                .orElseThrow(() -> new IllegalArgumentException("Offre not found: " + request.getOffreId()));

        if (!offre.getActif()) {
            throw new IllegalStateException("Cette offre n'est plus disponible");
        }

        if (abonnementRepository.existsByUserIdAndOffreIdAndStatut(
                user.getId(), offre.getId(), Abonnement.StatutAbonnement.ACTIF)) {
            throw new IllegalStateException("Vous êtes déjà abonné à cette offre");
        }

        LocalDate debut = LocalDate.now();
        LocalDate fin = debut.plusMonths(offre.getDureeEnMois());
        String reference = "TXN-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();

        Abonnement abonnement = Abonnement.builder()
                .user(user)
                .offre(offre)
                .dateDebut(debut)
                .dateFin(fin)
                .statut(Abonnement.StatutAbonnement.ACTIF)
                .methodePaiement(request.getMethodePaiement())
                .statutPaiement(Abonnement.StatutPaiement.PAYE)
                .montantPaye(offre.getPrix())
                .referenceTransaction(reference)
                .nomTitulaire(request.getNomTitulaire())
                .build();

        Abonnement saved = abonnementRepository.save(abonnement);

        // Scenario 2 — RabbitMQ: notify the student asynchronously
        try {
            AbonnementEvent event = new AbonnementEvent(
                    saved.getId(), offre.getId(), offre.getNom(),
                    userEmail, offre.getPrix(), reference, debut, fin, LocalDateTime.now()
            );
            eventPublisher.publishAbonnementCreated(event);
        } catch (Exception e) {
            log.warn("Could not publish AbonnementEvent to RabbitMQ: {}", e.getMessage());
        }

        // Scenario 1 — OpenFeign: notify the prof synchronously
        try {
            String profEmail = offre.getCreateur().getEmail();
            notificationClient.createNotification(new NotificationRequest(
                    "Nouveau paiement reçu ! " + request.getNomTitulaire() + " a souscrit à \"" + offre.getNom() + "\" (" + offre.getPrix() + "€) — Réf: " + reference,
                    "ABONNEMENT_RECEIVED",
                    profEmail,
                    offre.getId()
            ));
        } catch (Exception e) {
            log.warn("Could not send prof notification via Feign: {}", e.getMessage());
        }

        return toResponse(saved);
    }

    @Transactional
    public void annuler(Long id, String userEmail) {
        Abonnement abonnement = findById(id);
        User user = userProviderService.getOrCreate(userEmail);

        boolean isOwner = abonnement.getUser().getId().equals(user.getId());
        boolean isAdmin = user.getRole() == User.Role.ADMIN;
        if (!isOwner && !isAdmin) throw new SecurityException("Accès refusé");

        abonnement.setStatut(Abonnement.StatutAbonnement.ANNULE);
        abonnementRepository.save(abonnement);
    }

    private Abonnement findById(Long id) {
        return abonnementRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Abonnement not found: " + id));
    }

    private AbonnementDTO.Response toResponse(Abonnement a) {
        AbonnementDTO.Response r = new AbonnementDTO.Response();
        r.setId(a.getId());
        r.setUserEmail(a.getUser().getEmail());
        r.setOffreId(a.getOffre().getId());
        r.setOffreNom(a.getOffre().getNom());
        r.setMontantPaye(a.getMontantPaye());
        r.setStatut(a.getStatut());
        r.setMethodePaiement(a.getMethodePaiement());
        r.setStatutPaiement(a.getStatutPaiement());
        r.setReferenceTransaction(a.getReferenceTransaction());
        r.setNomTitulaire(a.getNomTitulaire());
        r.setDateDebut(a.getDateDebut());
        r.setDateFin(a.getDateFin());
        r.setCreatedAt(a.getCreatedAt());
        return r;
    }
}
