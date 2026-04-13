package tn.esprit.microservice.evenement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableDiscoveryClient // Rend l'application visible par la Gateway via Eureka Server
@EnableFeignClients // Permet d'appeler de manière synchrone le service "Utilisateur" (OpenFeign)
public class EvenementApplication {
    public static void main(String[] args) {
        SpringApplication.run(EvenementApplication.class, args);
    }
}
