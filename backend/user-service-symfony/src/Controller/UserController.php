<?php

namespace App\Controller;

use App\Security\KeycloakUser;
use App\Service\UserService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/users')]
class UserController extends AbstractController
{
    public function __construct(
        private readonly UserService $userService
    ) {
    }

    #[Route('', name: 'users_list', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function list(): JsonResponse
    {
        $users = $this->userService->getAllUsers();
        
        return $this->json([
            'success' => true,
            'data' => array_map(fn($user) => $user->toArray(), $users)
        ]);
    }

    #[Route('/{id}', name: 'users_get', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function get(string $id): JsonResponse
    {
        try {
            $user = $this->userService->getUserById($id);
            
            return $this->json([
                'success' => true,
                'data' => $user->toArray()
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    #[Route('/me', name: 'users_me', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function me(): JsonResponse
    {
        /** @var KeycloakUser $keycloakUser */
        $keycloakUser = $this->getUser();
        
        // Sync user from Keycloak token
        $user = $this->userService->syncUserFromKeycloak($keycloakUser);
        
        return $this->json([
            'success' => true,
            'data' => $user->toArray()
        ]);
    }

    #[Route('', name: 'users_create', methods: ['POST'])]
    #[IsGranted('ROLE_ADMIN')]
    public function create(Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            
            if (!isset($data['keycloakId'], $data['email'], $data['name'])) {
                return $this->json([
                    'success' => false,
                    'error' => 'Missing required fields: keycloakId, email, name'
                ], Response::HTTP_BAD_REQUEST);
            }
            
            $user = $this->userService->createUser($data);
            
            return $this->json([
                'success' => true,
                'data' => $user->toArray()
            ], Response::HTTP_CREATED);
        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{id}', name: 'users_update', methods: ['PUT'])]
    #[IsGranted('ROLE_ADMIN')]
    public function update(string $id, Request $request): JsonResponse
    {
        try {
            $data = json_decode($request->getContent(), true);
            $user = $this->userService->updateUser($id, $data);
            
            return $this->json([
                'success' => true,
                'data' => $user->toArray()
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'error' => $e->getMessage()
            ], Response::HTTP_BAD_REQUEST);
        }
    }

    #[Route('/{id}', name: 'users_delete', methods: ['DELETE'])]
    #[IsGranted('ROLE_ADMIN')]
    public function delete(string $id): JsonResponse
    {
        try {
            $this->userService->deleteUser($id);
            
            return $this->json([
                'success' => true,
                'message' => 'User deleted successfully'
            ]);
        } catch (\Exception $e) {
            return $this->json([
                'success' => false,
                'error' => $e->getMessage()
            ], Response::HTTP_NOT_FOUND);
        }
    }

    #[Route('/role/{role}', name: 'users_by_role', methods: ['GET'])]
    #[IsGranted('ROLE_ADMIN')]
    public function getUsersByRole(string $role): JsonResponse
    {
        $users = $this->userService->getUsersByRole('ROLE_' . strtoupper($role));
        
        return $this->json([
            'success' => true,
            'data' => array_map(fn($user) => $user->toArray(), $users)
        ]);
    }

    #[Route('/active', name: 'users_active', methods: ['GET'])]
    #[IsGranted('ROLE_USER')]
    public function getActiveUsers(): JsonResponse
    {
        $users = $this->userService->getActiveUsers();
        
        return $this->json([
            'success' => true,
            'data' => array_map(fn($user) => $user->toArray(), $users)
        ]);
    }
}
