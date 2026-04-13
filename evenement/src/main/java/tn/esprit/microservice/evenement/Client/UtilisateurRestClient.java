package tn.esprit.microservice.evenement.Client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

/**
 * =======  OpenFeign (Communication synchrone) =======
 * Ce client HTTP permet au service "Evenement" de communiquer directement avec le service "Utilisateur".
 * Le nom "UTILISATEUR-MS" est le nom sous lequel le microservice Utilisateur s'enregistrera sur Eureka.
 */
@FeignClient(name = "UTILISATEUR-MS")
public interface UtilisateurRestClient {

    // Exemple de route que "Utilisateur-ms" 
    // Cela nous permettra de vérifier si un Formateur ou Etudiant existe vraiment avant de l'inscrire !
    @GetMapping("/api/utilisateurs/{id}")
    Object getUtilisateurById(@PathVariable("id") Long id);
}
