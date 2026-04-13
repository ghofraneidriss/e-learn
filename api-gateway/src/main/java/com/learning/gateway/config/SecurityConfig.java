package com.learning.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

/**
 * Keycloak security at the API Gateway level.
 * The Gateway is the first line of defense — it validates the Keycloak token
 * before forwarding requests to downstream services.
 */
@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain springSecurityFilterChain(ServerHttpSecurity http) {
        http
            .csrf(ServerHttpSecurity.CsrfSpec::disable)
            .cors(ServerHttpSecurity.CorsSpec::disable) // CORS handled by gateway globalcors in application.yml
            .authorizeExchange(exchanges -> exchanges
                // Allow CORS preflight requests without authentication
                .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                // Public auth endpoints
                .pathMatchers("/api/auth/login", "/api/auth/register", "/api/auth/refresh").permitAll()
                // Protected endpoints
                .pathMatchers("/api/auth/me").authenticated()
                .pathMatchers("/api/**").authenticated()
                .anyExchange().permitAll()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> {}) // issuer-uri configured in application.yml
            );

        return http.build();
    }
}
