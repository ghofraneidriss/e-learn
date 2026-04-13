package com.learning.quiz.security;

import com.learning.quiz.model.User;
import com.learning.quiz.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

/**
 * Replaces the old userRepository.findByEmail().orElseThrow() pattern.
 * Auto-creates a local User record from the Keycloak token on first access.
 */
@Service
@RequiredArgsConstructor
public class UserProviderService {

    private final UserRepository userRepository;

    public User getOrCreate(String email) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User.Role role = extractRoleFromSecurityContext();
                    User newUser = User.builder()
                            .email(email)
                            .username(email.split("@")[0])
                            .password("keycloak-managed") // auth handled by Keycloak
                            .role(role)
                            .build();
                    return userRepository.save(newUser);
                });
    }

    private User.Role extractRoleFromSecurityContext() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null) return User.Role.ETUDIANT;

        return auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .filter(a -> a.startsWith("ROLE_"))
                .map(a -> a.substring(5))
                .filter(r -> r.equals("ETUDIANT") || r.equals("ENSEIGNANT") || r.equals("ADMIN"))
                .findFirst()
                .map(User.Role::valueOf)
                .orElse(User.Role.ETUDIANT);
    }
}
