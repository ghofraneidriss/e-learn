package tn.esprit.microservice.evenement.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.microservice.evenement.Entity.Evenement;
import tn.esprit.microservice.evenement.Repository.EvenementRepository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

@Service
public class EvenementService {
    
    @Autowired
    private EvenementRepository repository;

    @Autowired
    private RabbitTemplate rabbitTemplate; // Injection pour RabbitMQ (Étape 3)

    public List<Evenement> getAllFuturEvents() {
        // Renvoie uniquement les événements dont la date est dans le futur
        return repository.findAll().stream()
                .filter(e -> e.getDate() != null && e.getDate().isAfter(LocalDateTime.now()))
                .toList();
    }

    public Evenement createEvenement(Evenement evenement) {
        // Validation entre date de début et date de fin
        if (evenement.getDateFin() != null && evenement.getDate() != null) {
            if (evenement.getDateFin().isBefore(evenement.getDate())) {
                throw new IllegalArgumentException("La date de fin ne peut pas être antérieure à la date de début.");
            }
        }
        
        Evenement savedEvent = repository.save(evenement);
        
        // ======= Etape 3: Communication Asynchrone (RabbitMQ) =======
        // Publication d'un message pour notifier de la création de l'événement
        try {
            String message = "NOUVEL EVENEMENT: " + savedEvent.getNom() + " a été créé !";
            // "exchange" par défaut souvent utilisé, "routingKey" : evenement.cree
            rabbitTemplate.convertAndSend("", "evenement.cree", message);
            System.out.println("✅ [RabbitMQ] Message envoyé : " + message);
        } catch (Exception e) {
            System.err.println("❌ [RabbitMQ] Impossible d'envoyer le message. RabbitMQ est-il lancé ?");
        }

        return savedEvent;
    }

    public Evenement updateEvenement(Long id, Evenement updatedDetails) {
        return repository.findById(id).map(e -> {
            e.setNom(updatedDetails.getNom());
            e.setDescription(updatedDetails.getDescription());
            e.setType(updatedDetails.getType());
            e.setDate(updatedDetails.getDate());
            e.setDateFin(updatedDetails.getDateFin());
            e.setLieu(updatedDetails.getLieu());
            e.setCapaciteMax(updatedDetails.getCapaciteMax());
            return repository.save(e);
        }).orElseThrow(() -> new RuntimeException("Evénement non trouvé avec l'id : " + id));
    }

    public void deleteEvenement(Long id) {
        repository.deleteById(id);
    }

    public void registerUser(Long eventId, Long userId) {
        Evenement e = repository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Evénement non trouvé"));
                
        // Validation de capacité
        if (e.getParticipantsIds().size() >= e.getCapaciteMax()) {
            throw new RuntimeException("Capacité maximale de l'événement atteinte (" + e.getCapaciteMax() + " places).");
        }
        
        // Validation de non-duplication
        if (e.getParticipantsIds().contains(userId)) {
            throw new RuntimeException("L'utilisateur est déjà inscrit à cet événement.");
        }
        
        e.getParticipantsIds().add(userId);
        repository.save(e);
    }

    public void unregisterUser(Long eventId, Long userId) {
        Evenement e = repository.findById(eventId)
                .orElseThrow(() -> new RuntimeException("Evénement non trouvé"));
                
        e.getParticipantsIds().remove(userId);
        repository.save(e);
    }

    public List<Long> getParticipants(Long eventId) {
        return repository.findById(eventId)
                .map(Evenement::getParticipantsIds)
                .orElseThrow(() -> new RuntimeException("Evénement non trouvé"));
    }
}
