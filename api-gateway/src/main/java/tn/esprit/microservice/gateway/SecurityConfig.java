package tn.esprit.microservice.gateway;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import reactor.core.publisher.Mono;

import java.util.Collection;
import java.util.Collections;
import java.util.Map;
import java.util.stream.Collectors;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .csrf(ServerHttpSecurity.CsrfSpec::disable)
            .authorizeExchange(exchange -> exchange
                // Accès à Eureka
                .pathMatchers("/eureka/**").permitAll()
                
                // ✅ RÈGLES DE SÉCURITÉ PAR RÔLE (RBAC)
                
                // L'étudiant (et l'admin) peuvent consulter les événements
                .pathMatchers(HttpMethod.GET, "/api/events/**").hasAnyRole("etudiant", "admin")
                
                // Seul l'étudiant peut s'inscrire ou se désinscrire
                .pathMatchers(HttpMethod.POST, "/api/events/*/registerUser").hasRole("etudiant")
                .pathMatchers(HttpMethod.DELETE, "/api/events/*/unregisterUser").hasRole("etudiant")
                
                // Seul l'Admin peut ajouter, modifier, supprimer un événement et voir les participants
                .pathMatchers(HttpMethod.POST, "/api/events").hasRole("admin")
                .pathMatchers(HttpMethod.PUT, "/api/events/**").hasRole("admin")
                .pathMatchers(HttpMethod.DELETE, "/api/events/**").hasRole("admin")
                .pathMatchers(HttpMethod.GET, "/api/events/*/participants").hasRole("admin")
                
                // Toute autre requête nécessite d'être connecté
                .anyExchange().authenticated()
            )
            // On configure le convertisseur pour lire les rôles de Keycloak (admin, etudiant)
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(grantedAuthoritiesExtractor())));
        
        return http.build();
    }

    // Convertisseur permettant d'extraire les rôles "realm_access" du Token de Keycloak
    private Converter<Jwt, Mono<org.springframework.security.authentication.AbstractAuthenticationToken>> grantedAuthoritiesExtractor() {
        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(new KeycloakRoleConverter());
        return new ReactiveJwtAuthenticationConverterAdapter(jwtAuthenticationConverter);
    }

    // Classe interne pour mapper les rôles et rajouter le préfixe "ROLE_" obligatoire dans Spring Security
    static class KeycloakRoleConverter implements Converter<Jwt, Collection<GrantedAuthority>> {
        @Override
        public Collection<GrantedAuthority> convert(Jwt jwt) {
            Map<String, Object> realmAccess = (Map<String, Object>) jwt.getClaims().get("realm_access");
            if (realmAccess == null || realmAccess.isEmpty()) {
                return Collections.emptyList();
            }
            Collection<String> roles = (Collection<String>) realmAccess.get("roles");
            return roles.stream()
                    .map(roleName -> "ROLE_" + roleName)
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());
        }
    }
}
