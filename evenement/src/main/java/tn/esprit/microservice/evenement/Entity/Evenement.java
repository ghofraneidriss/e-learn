package tn.esprit.microservice.evenement.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
public class Evenement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nom;
    private String description;
    
    @Enumerated(EnumType.STRING)
    private TypeEvenement type; // WEBINAIRE, EXAMEN, ATELIER, HACKATHON
    
    private LocalDateTime date;
    private LocalDateTime dateFin; // Pour les Hackathons
    
    private String lieu; // URL si en ligne, salle si présentiel
    
    private int capaciteMax;
    
    // Identification
    private Long formateurId; // ID de l'admin/formateur qui crée l'événement
    
    @ElementCollection
    private List<Long> participantsIds = new ArrayList<>(); // Liste des IDs des utilisateurs inscrits

    public Evenement() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNom() { return nom; }
    public void setNom(String nom) { this.nom = nom; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public TypeEvenement getType() { return type; }
    public void setType(TypeEvenement type) { this.type = type; }

    public LocalDateTime getDate() { return date; }
    public void setDate(LocalDateTime date) { this.date = date; }

    public LocalDateTime getDateFin() { return dateFin; }
    public void setDateFin(LocalDateTime dateFin) { this.dateFin = dateFin; }

    public String getLieu() { return lieu; }
    public void setLieu(String lieu) { this.lieu = lieu; }

    public int getCapaciteMax() { return capaciteMax; }
    public void setCapaciteMax(int capaciteMax) { this.capaciteMax = capaciteMax; }

    public Long getFormateurId() { return formateurId; }
    public void setFormateurId(Long formateurId) { this.formateurId = formateurId; }

    public List<Long> getParticipantsIds() { return participantsIds; }
    public void setParticipantsIds(List<Long> participantsIds) { this.participantsIds = participantsIds; }
}
