<?php

namespace App\Security;

use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\UserProviderInterface;

class KeycloakUserProvider implements UserProviderInterface
{
    public function __construct(
        private readonly string $keycloakUrl,
        private readonly string $keycloakRealm
    ) {
    }

    public function refreshUser(UserInterface $user): UserInterface
    {
        if (!$user instanceof KeycloakUser) {
            throw new UnsupportedUserException(sprintf('Invalid user class "%s".', get_class($user)));
        }

        return $user;
    }

    public function supportsClass(string $class): bool
    {
        return KeycloakUser::class === $class || is_subclass_of($class, KeycloakUser::class);
    }

    public function loadUserByIdentifier(string $identifier): UserInterface
    {
        // This method is called by the authenticator
        // The actual user loading is done in the authenticator's UserBadge callback
        throw new \LogicException('This method should not be called directly');
    }
}
