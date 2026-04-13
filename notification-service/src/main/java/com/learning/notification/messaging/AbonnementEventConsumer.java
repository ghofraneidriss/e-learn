package com.learning.notification.messaging;

import com.learning.notification.dto.NotificationDTO;
import com.learning.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AbonnementEventConsumer {

    private final NotificationService notificationService;

    /**
     * Scenario 2 — RabbitMQ:
     * Consumes AbonnementCreated events published by abonnement-service.
     * Creates a notification in the DB for the user.
     */
    @RabbitListener(queues = RabbitMQConfig.ABONNEMENT_QUEUE)
    public void handleAbonnementCreated(AbonnementEvent event) {
        log.info("Received AbonnementEvent via RabbitMQ: offreId={}, user={}",
                event.getOffreId(), event.getUserEmail());

        String message = String.format(
                "✅ Paiement confirmé ! Votre abonnement à \"%s\" est actif du %s au %s. Montant : %.2f€ — Réf: %s",
                event.getOffreNom(),
                event.getDateDebut(),
                event.getDateFin(),
                event.getMontantPaye(),
                event.getReferenceTransaction()
        );

        NotificationDTO.Request request = new NotificationDTO.Request();
        request.setMessage(message);
        request.setType("ABONNEMENT_CREATED");
        request.setUserId(event.getUserEmail());
        request.setOffreId(event.getOffreId());

        notificationService.create(request);
    }
}
