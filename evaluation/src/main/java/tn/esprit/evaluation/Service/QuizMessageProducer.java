package tn.esprit.evaluation.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.evaluation.Config.RabbitMQConfig;

@Service
public class QuizMessageProducer {

    private static final Logger log = LoggerFactory.getLogger(QuizMessageProducer.class);

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendQuizNotification(String message) {
        try {
            rabbitTemplate.convertAndSend(RabbitMQConfig.QUIZ_EXCHANGE, RabbitMQConfig.QUIZ_ROUTING_KEY, message);
        } catch (AmqpException e) {
            log.warn("RabbitMQ notification skipped for message: {}", message, e);
        }
    }
}
