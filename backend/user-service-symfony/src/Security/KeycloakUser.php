<?php

namespace App\Security;

use Symfony\Component\Security\Core\User\UserInterface;

class KeycloakUser implements UserInterface
{
    public function __construct(
        private readonly string $keycloakId,
        private readonly string $email,
        private readonly string $name,
        private readonly array $roles
    ) {
    }

    public function getRoles(): array
    {
        return $this->roles;
    }

    public function eraseCredentials(): void
    {
        // Nothing to erase
    }

    public function getUserIdentifier(): string
    {
        return $this->keycloakId;
    }

    public function getKeycloakId(): string
    {
        return $this->keycloakId;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getName(): string
    {
        return $this->name;
    }
}
