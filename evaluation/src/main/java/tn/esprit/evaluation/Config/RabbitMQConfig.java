package tn.esprit.evaluation.Config;

import org.springframework.amqp.core.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String QUIZ_EXCHANGE = "quiz.exchange";
    public static final String QUIZ_QUEUE = "quiz.queue";
    public static final String QUIZ_ROUTING_KEY = "quiz.routing.key";

    @Bean
    public Queue quizQueue() {
        return new Queue(QUIZ_QUEUE);
    }

    @Bean
    public TopicExchange quizExchange() {
        return new TopicExchange(QUIZ_EXCHANGE);
    }

    @Bean
    public Binding quizBinding(Queue quizQueue, TopicExchange quizExchange) {
        return BindingBuilder.bind(quizQueue).to(quizExchange).with(QUIZ_ROUTING_KEY);
    }
}
