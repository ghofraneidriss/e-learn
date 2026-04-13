package com.learning.quiz.messaging;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AbonnementEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    /**
     * Scenario 2 — RabbitMQ:
     * Publishes an AbonnementEvent when a user subscribes to an offre.
     * notification-service consumes this event asynchronously.
     */
    public void publishAbonnementCreated(AbonnementEvent event) {
        log.info("Publishing AbonnementEvent to RabbitMQ: offreId={}, user={}",
                event.getOffreId(), event.getUserEmail());
        rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE,
                RabbitMQConfig.ABONNEMENT_ROUTING_KEY,
                event
        );
    }
}
