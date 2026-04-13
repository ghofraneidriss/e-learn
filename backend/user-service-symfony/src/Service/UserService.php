<?php

namespace App\Service;

use App\Document\User;
use App\Repository\UserRepository;
use App\Security\KeycloakUser;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class UserService
{
    public function __construct(
        private readonly UserRepository $userRepository
    ) {
    }

    public function getAllUsers(): array
    {
        return $this->userRepository->findAll();
    }

    public function getUserById(string $id): User
    {
        $user = $this->userRepository->findById($id);
        
        if (!$user) {
            throw new NotFoundHttpException('User not found');
        }
        
        return $user;
    }

    public function getUserByKeycloakId(string $keycloakId): ?User
    {
        return $this->userRepository->findByKeycloakId($keycloakId);
    }

    public function createUser(array $data): User
    {
        $user = new User();
        $user->setKeycloakId($data['keycloakId']);
        $user->setEmail($data['email']);
        $user->setName($data['name']);
        $user->setRoles($data['roles'] ?? ['ROLE_USER']);
        
        if (isset($data['phone'])) {
            $user->setPhone($data['phone']);
        }
        
        if (isset($data['avatar'])) {
            $user->setAvatar($data['avatar']);
        }
        
        if (isset($data['active'])) {
            $user->setActive($data['active']);
        }
        
        $this->userRepository->save($user);
        
        return $user;
    }

    public function updateUser(string $id, array $data): User
    {
        $user = $this->getUserById($id);
        
        if (isset($data['email'])) {
            $user->setEmail($data['email']);
        }
        
        if (isset($data['name'])) {
            $user->setName($data['name']);
        }
        
        if (isset($data['roles'])) {
            $user->setRoles($data['roles']);
        }
        
        if (isset($data['phone'])) {
            $user->setPhone($data['phone']);
        }
        
        if (isset($data['avatar'])) {
            $user->setAvatar($data['avatar']);
        }
        
        if (isset($data['active'])) {
            $user->setActive($data['active']);
        }
        
        $this->userRepository->save($user);
        
        return $user;
    }

    public function deleteUser(string $id): void
    {
        $user = $this->getUserById($id);
        $this->userRepository->delete($user);
    }

    public function syncUserFromKeycloak(KeycloakUser $keycloakUser): User
    {
        $user = $this->getUserByKeycloakId($keycloakUser->getKeycloakId());
        
        if (!$user) {
            // Create new user
            $user = new User();
            $user->setKeycloakId($keycloakUser->getKeycloakId());
        }
        
        // Update user data from Keycloak
        $user->setEmail($keycloakUser->getEmail());
        $user->setName($keycloakUser->getName());
        $user->setRoles($keycloakUser->getRoles());
        
        $this->userRepository->save($user);
        
        return $user;
    }

    public function getUsersByRole(string $role): array
    {
        return $this->userRepository->findByRole($role);
    }

    public function getActiveUsers(): array
    {
        return $this->userRepository->findActiveUsers();
    }
}
