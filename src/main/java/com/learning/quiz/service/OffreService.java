package com.learning.quiz.service;

import com.learning.quiz.client.NotificationClient;
import com.learning.quiz.client.NotificationRequest;
import com.learning.quiz.dto.OffreDTO;
import com.learning.quiz.model.Offre;
import com.learning.quiz.model.User;
import com.learning.quiz.repository.OffreRepository;
import com.learning.quiz.security.UserProviderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class OffreService {

    private final OffreRepository offreRepository;
    private final UserProviderService userProviderService;
    private final NotificationClient notificationClient;

    public List<OffreDTO.Response> getOffresActives() {
        return offreRepository.findByActifTrue().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public List<OffreDTO.Response> getAllOffres() {
        return offreRepository.findAll().stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public OffreDTO.Response getOffre(Long id) {
        return toResponse(findById(id));
    }

    public List<OffreDTO.Response> getMesOffres(String email) {
        User user = userProviderService.getOrCreate(email);
        return offreRepository.findByCreateurId(user.getId()).stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public OffreDTO.Response createOffre(OffreDTO.Request request, String creatorEmail) {
        User creator = userProviderService.getOrCreate(creatorEmail);

        Offre offre = Offre.builder()
                .nom(request.getNom())
                .description(request.getDescription())
                .prix(request.getPrix())
                .dureeEnMois(request.getDureeEnMois())
                .type(request.getType())
                .niveau(request.getNiveau())
                .nombreCoursInclus(request.getNombreCoursInclus())
                .nombreQuizInclus(request.getNombreQuizInclus())
                .matieres(request.getMatieres())
                .avantages(request.getAvantages())
                .actif(true)
                .createur(creator)
                .build();

        Offre saved = offreRepository.save(offre);

        try {
            NotificationRequest notif = new NotificationRequest(
                    "Nouvelle offre publiée : \"" + saved.getNom() + "\" — " + saved.getPrix() + "€/" + saved.getDureeEnMois() + " mois",
                    "OFFRE_CREATED",
                    creatorEmail,
                    saved.getId()
            );
            notificationClient.createNotification(notif);
        } catch (Exception e) {
            log.warn("Could not send notification via Feign: {}", e.getMessage());
        }

        return toResponse(saved);
    }

    @Transactional
    public OffreDTO.Response updateOffre(Long id, OffreDTO.Request request, String editorEmail) {
        Offre offre = findById(id);
        assertOwnerOrAdmin(offre, editorEmail);

        offre.setNom(request.getNom());
        offre.setDescription(request.getDescription());
        offre.setPrix(request.getPrix());
        offre.setDureeEnMois(request.getDureeEnMois());
        offre.setType(request.getType());
        offre.setNiveau(request.getNiveau());
        offre.setNombreCoursInclus(request.getNombreCoursInclus());
        offre.setNombreQuizInclus(request.getNombreQuizInclus());
        offre.setMatieres(request.getMatieres());
        offre.setAvantages(request.getAvantages());

        return toResponse(offreRepository.save(offre));
    }

    @Transactional
    public void toggleActif(Long id, String editorEmail) {
        Offre offre = findById(id);
        assertOwnerOrAdmin(offre, editorEmail);
        offre.setActif(!offre.getActif());
        offreRepository.save(offre);
    }

    @Transactional
    public void deleteOffre(Long id, String editorEmail) {
        Offre offre = findById(id);
        assertOwnerOrAdmin(offre, editorEmail);
        offreRepository.delete(offre);
    }

    private Offre findById(Long id) {
        return offreRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Offre not found: " + id));
    }

    private void assertOwnerOrAdmin(Offre offre, String email) {
        User user = userProviderService.getOrCreate(email);
        boolean isOwner = offre.getCreateur().getId().equals(user.getId());
        boolean isAdmin = user.getRole() == User.Role.ADMIN;
        if (!isOwner && !isAdmin) {
            throw new SecurityException("Accès refusé : vous n'êtes pas le créateur de cette offre");
        }
    }

    private OffreDTO.Response toResponse(Offre offre) {
        OffreDTO.Response r = new OffreDTO.Response();
        r.setId(offre.getId());
        r.setNom(offre.getNom());
        r.setDescription(offre.getDescription());
        r.setPrix(offre.getPrix());
        r.setDureeEnMois(offre.getDureeEnMois());
        r.setType(offre.getType());
        r.setNiveau(offre.getNiveau());
        r.setNombreCoursInclus(offre.getNombreCoursInclus());
        r.setNombreQuizInclus(offre.getNombreQuizInclus());
        r.setMatieres(offre.getMatieres());
        r.setAvantages(offre.getAvantages());
        r.setActif(offre.getActif());
        r.setCreatedAt(offre.getCreatedAt());
        if (offre.getCreateur() != null) {
            r.setCreateurEmail(offre.getCreateur().getEmail());
        }
        return r;
    }
}
