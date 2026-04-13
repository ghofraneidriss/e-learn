package com.learning.quiz.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Value("${keycloak.token-uri:http://localhost:8180/realms/quiz-realm/protocol/openid-connect/token}")
    private String keycloakTokenUri;

    @Value("${keycloak.client-id:quiz-client}")
    private String clientId;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "password");
        form.add("client_id", clientId);
        form.add("username", email);
        form.add("password", password);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        try {
            ResponseEntity<Map> kcResponse = restTemplate.postForEntity(
                keycloakTokenUri,
                new HttpEntity<>(form, headers),
                Map.class
            );

            Map<String, Object> body = kcResponse.getBody();
            String accessToken = (String) body.get("access_token");

            // Decode JWT to extract user info
            String[] parts = accessToken.split("\\.");
            String payload = new String(java.util.Base64.getUrlDecoder().decode(parts[1]));
            com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
            Map<String, Object> claims = mapper.readValue(payload, Map.class);

            String username = (String) claims.getOrDefault("preferred_username", email);
            String userEmail = (String) claims.getOrDefault("email", email);

            // Extract role from realm_access.roles
            String role = "ETUDIANT";
            Object realmAccess = claims.get("realm_access");
            if (realmAccess instanceof Map) {
                Object roles = ((Map<?, ?>) realmAccess).get("roles");
                if (roles instanceof List) {
                    List<?> roleList = (List<?>) roles;
                    if (roleList.contains("ADMIN")) role = "ADMIN";
                    else if (roleList.contains("ENSEIGNANT")) role = "ENSEIGNANT";
                    else if (roleList.contains("ETUDIANT")) role = "ETUDIANT";
                }
            }

            String refreshToken = (String) body.get("refresh_token");

            Map<String, String> authResponse = new HashMap<>();
            authResponse.put("token", accessToken);
            authResponse.put("refreshToken", refreshToken);
            authResponse.put("username", username);
            authResponse.put("email", userEmail);
            authResponse.put("role", role);

            return ResponseEntity.ok(authResponse);

        } catch (HttpClientErrorException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Email ou mot de passe incorrect"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("message", "Erreur serveur: " + e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestBody Map<String, String> request) {
        String refreshToken = request.get("refreshToken");

        MultiValueMap<String, String> form = new LinkedMultiValueMap<>();
        form.add("grant_type", "refresh_token");
        form.add("client_id", clientId);
        form.add("refresh_token", refreshToken);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        try {
            ResponseEntity<Map> kcResponse = restTemplate.postForEntity(
                keycloakTokenUri,
                new HttpEntity<>(form, headers),
                Map.class
            );

            Map<String, Object> body = kcResponse.getBody();
            String newAccessToken = (String) body.get("access_token");
            String newRefreshToken = (String) body.get("refresh_token");

            Map<String, String> result = new HashMap<>();
            result.put("token", newAccessToken);
            result.put("refreshToken", newRefreshToken);
            return ResponseEntity.ok(result);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "Session expirée, veuillez vous reconnecter"));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<Map<String, Object>> me(@AuthenticationPrincipal Jwt jwt) {
        Map<String, Object> info = new HashMap<>();
        info.put("email", jwt.getClaimAsString("email"));
        info.put("username", jwt.getClaimAsString("preferred_username"));
        info.put("roles", jwt.getClaimAsMap("realm_access"));
        return ResponseEntity.ok(info);
    }
}
