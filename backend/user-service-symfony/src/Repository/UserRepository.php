<?php

namespace App\Repository;

use App\Document\User;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ODM\MongoDB\Repository\DocumentRepository;

class UserRepository
{
    private DocumentRepository $repository;

    public function __construct(private readonly DocumentManager $dm)
    {
        $this->repository = $dm->getRepository(User::class);
    }

    public function findAll(): array
    {
        return $this->repository->findAll();
    }

    public function findById(string $id): ?User
    {
        return $this->repository->find($id);
    }

    public function findByKeycloakId(string $keycloakId): ?User
    {
        return $this->repository->findOneBy(['keycloakId' => $keycloakId]);
    }

    public function findByEmail(string $email): ?User
    {
        return $this->repository->findOneBy(['email' => $email]);
    }

    public function save(User $user): void
    {
        $user->setUpdatedAt(new \DateTime());
        $this->dm->persist($user);
        $this->dm->flush();
    }

    public function delete(User $user): void
    {
        $this->dm->remove($user);
        $this->dm->flush();
    }

    public function findByRole(string $role): array
    {
        return $this->repository->findBy(['roles' => $role]);
    }

    public function findActiveUsers(): array
    {
        return $this->repository->findBy(['active' => true]);
    }
}
