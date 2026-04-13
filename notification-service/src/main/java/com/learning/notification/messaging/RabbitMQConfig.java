package com.learning.notification.messaging;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String EXCHANGE = "abonnement.topic.exchange";
    public static final String ABONNEMENT_QUEUE = "notification.abonnement.queue";
    public static final String ABONNEMENT_ROUTING_KEY = "abonnement.created";

    @Bean
    public TopicExchange abonnementExchange() {
        return new TopicExchange(EXCHANGE);
    }

    @Bean
    public Queue abonnementQueue() {
        return QueueBuilder.durable(ABONNEMENT_QUEUE).build();
    }

    @Bean
    public Binding abonnementBinding(Queue abonnementQueue, TopicExchange abonnementExchange) {
        return BindingBuilder.bind(abonnementQueue).to(abonnementExchange).with(ABONNEMENT_ROUTING_KEY);
    }

    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
