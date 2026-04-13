<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class KeycloakService
{
    public function __construct(
        private readonly HttpClientInterface $httpClient,
        private readonly string $keycloakUrl,
        private readonly string $keycloakRealm,
        private readonly string $clientId,
        private readonly string $clientSecret
    ) {
    }

    public function getUserInfo(string $accessToken): array
    {
        $url = sprintf(
            '%s/realms/%s/protocol/openid-connect/userinfo',
            $this->keycloakUrl,
            $this->keycloakRealm
        );

        try {
            $response = $this->httpClient->request('GET', $url, [
                'headers' => [
                    'Authorization' => 'Bearer ' . $accessToken,
                ],
            ]);

            return $response->toArray();
        } catch (\Exception $e) {
            throw new \RuntimeException('Failed to fetch user info from Keycloak: ' . $e->getMessage());
        }
    }

    public function getAdminToken(): string
    {
        $url = sprintf(
            '%s/realms/%s/protocol/openid-connect/token',
            $this->keycloakUrl,
            $this->keycloakRealm
        );

        try {
            $response = $this->httpClient->request('POST', $url, [
                'body' => [
                    'grant_type' => 'client_credentials',
                    'client_id' => $this->clientId,
                    'client_secret' => $this->clientSecret,
                ],
            ]);

            $data = $response->toArray();
            return $data['access_token'];
        } catch (\Exception $e) {
            throw new \RuntimeException('Failed to get admin token from Keycloak: ' . $e->getMessage());
        }
    }

    public function introspectToken(string $token): array
    {
        $url = sprintf(
            '%s/realms/%s/protocol/openid-connect/token/introspect',
            $this->keycloakUrl,
            $this->keycloakRealm
        );

        try {
            $response = $this->httpClient->request('POST', $url, [
                'body' => [
                    'token' => $token,
                    'client_id' => $this->clientId,
                    'client_secret' => $this->clientSecret,
                ],
            ]);

            return $response->toArray();
        } catch (\Exception $e) {
            throw new \RuntimeException('Failed to introspect token: ' . $e->getMessage());
        }
    }
}
