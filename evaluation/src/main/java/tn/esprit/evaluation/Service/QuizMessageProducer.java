package tn.esprit.evaluation.Service;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tn.esprit.evaluation.Config.RabbitMQConfig;

@Service
public class QuizMessageProducer {

    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendQuizNotification(String message) {
        rabbitTemplate.convertAndSend(RabbitMQConfig.QUIZ_EXCHANGE, RabbitMQConfig.QUIZ_ROUTING_KEY, message);
    }
}
