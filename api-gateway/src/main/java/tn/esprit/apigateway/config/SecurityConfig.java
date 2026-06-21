package tn.esprit.apigateway.config;

import java.util.Collection;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.ReactiveJwtAuthenticationConverterAdapter;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.core.convert.converter.Converter;

import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
            .csrf(ServerHttpSecurity.CsrfSpec::disable)
            .authorizeExchange(exchange -> exchange
                .pathMatchers("/eureka/**").permitAll()
                .pathMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                .pathMatchers(HttpMethod.GET, "/cours/**", "/quizzes/**").hasAnyRole("STUDENT", "TEACHER", "ADMIN")
                .pathMatchers(HttpMethod.POST, "/cours/**", "/quizzes/**").hasAnyRole("TEACHER", "ADMIN")
                .pathMatchers(HttpMethod.PUT, "/cours/**", "/quizzes/**").hasAnyRole("TEACHER", "ADMIN")
                .pathMatchers(HttpMethod.DELETE, "/cours/**", "/quizzes/**").hasAnyRole("TEACHER", "ADMIN")
                .anyExchange().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter())));
        return http.build();
    }

    @Bean
    public Converter<Jwt, Mono<AbstractAuthenticationToken>> jwtAuthenticationConverter() {
        return new ReactiveJwtAuthenticationConverterAdapter(jwt -> {
            Set<GrantedAuthority> authorities = new HashSet<>();

            Map<String, Object> realmAccess = jwt.getClaim("realm_access");
            if (realmAccess != null) {
                Object roles = realmAccess.get("roles");
                if (roles instanceof Collection<?> collection) {
                    for (Object role : collection) {
                        if (role != null) {
                            authorities.add(new SimpleGrantedAuthority("ROLE_" + role.toString()));
                        }
                    }
                }
            }

            return new JwtAuthenticationToken(jwt, authorities, jwt.getSubject());
        });
    }
}
