<?php

namespace App\Security;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Exception\AuthenticationException;
use Symfony\Component\Security\Http\Authenticator\AbstractAuthenticator;
use Symfony\Component\Security\Http\Authenticator\Passport\Badge\UserBadge;
use Symfony\Component\Security\Http\Authenticator\Passport\Passport;
use Symfony\Component\Security\Http\Authenticator\Passport\SelfValidatingPassport;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class KeycloakAuthenticator extends AbstractAuthenticator
{
    private ?array $publicKeys = null;

    public function __construct(
        private readonly HttpClientInterface $httpClient,
        private readonly string $keycloakUrl,
        private readonly string $keycloakRealm
    ) {
    }

    public function supports(Request $request): ?bool
    {
        return $request->headers->has('Authorization');
    }

    public function authenticate(Request $request): Passport
    {
        $authHeader = $request->headers->get('Authorization');
        
        if (!$authHeader || !str_starts_with($authHeader, 'Bearer ')) {
            throw new AuthenticationException('No Bearer token provided');
        }

        $token = substr($authHeader, 7);

        try {
            $decoded = $this->validateToken($token);
            
            // Store decoded token in request attributes for later use
            $request->attributes->set('keycloak_token', $decoded);
            
            return new SelfValidatingPassport(
                new UserBadge($decoded->sub, function ($userIdentifier) use ($decoded) {
                    return new KeycloakUser(
                        $decoded->sub,
                        $decoded->email ?? '',
                        $decoded->name ?? $decoded->preferred_username ?? '',
                        $this->extractRoles($decoded)
                    );
                })
            );
        } catch (\Exception $e) {
            throw new AuthenticationException('Invalid token: ' . $e->getMessage());
        }
    }

    private function validateToken(string $token): object
    {
        $publicKey = $this->getPublicKey($token);
        
        return JWT::decode($token, new Key($publicKey, 'RS256'));
    }

    private function getPublicKey(string $token): string
    {
        if ($this->publicKeys === null) {
            $this->publicKeys = $this->fetchPublicKeys();
        }

        // Decode token header to get kid
        $tokenParts = explode('.', $token);
        $header = json_decode(base64_decode($tokenParts[0]), true);
        $kid = $header['kid'] ?? null;

        if (!$kid || !isset($this->publicKeys[$kid])) {
            throw new AuthenticationException('Invalid token key ID');
        }

        return $this->publicKeys[$kid];
    }

    private function fetchPublicKeys(): array
    {
        $url = sprintf(
            '%s/realms/%s/protocol/openid-connect/certs',
            $this->keycloakUrl,
            $this->keycloakRealm
        );

        try {
            $response = $this->httpClient->request('GET', $url);
            $data = $response->toArray();
            
            $keys = [];
            foreach ($data['keys'] as $key) {
                if ($key['use'] === 'sig' && isset($key['kid'])) {
                    $keys[$key['kid']] = $this->convertJwkToPem($key);
                }
            }
            
            return $keys;
        } catch (\Exception $e) {
            throw new AuthenticationException('Failed to fetch Keycloak public keys: ' . $e->getMessage());
        }
    }

    private function convertJwkToPem(array $jwk): string
    {
        // Convert JWK to PEM format
        $n = $this->base64UrlDecode($jwk['n']);
        $e = $this->base64UrlDecode($jwk['e']);
        
        $rsa = new \phpseclib3\Crypt\RSA();
        $rsa->loadKey([
            'n' => new \phpseclib3\Math\BigInteger($n, 256),
            'e' => new \phpseclib3\Math\BigInteger($e, 256)
        ]);
        
        return $rsa->getPublicKey();
    }

    private function base64UrlDecode(string $input): string
    {
        $remainder = strlen($input) % 4;
        if ($remainder) {
            $padlen = 4 - $remainder;
            $input .= str_repeat('=', $padlen);
        }
        return base64_decode(strtr($input, '-_', '+/'));
    }

    private function extractRoles(object $decoded): array
    {
        $roles = ['ROLE_USER'];
        
        // Extract realm roles
        if (isset($decoded->realm_access->roles)) {
            foreach ($decoded->realm_access->roles as $role) {
                $roles[] = 'ROLE_' . strtoupper($role);
            }
        }
        
        // Extract resource roles
        if (isset($decoded->resource_access)) {
            foreach ($decoded->resource_access as $resource => $access) {
                if (isset($access->roles)) {
                    foreach ($access->roles as $role) {
                        $roles[] = 'ROLE_' . strtoupper($role);
                    }
                }
            }
        }
        
        return array_unique($roles);
    }

    public function onAuthenticationSuccess(Request $request, TokenInterface $token, string $firewallName): ?Response
    {
        return null;
    }

    public function onAuthenticationFailure(Request $request, AuthenticationException $exception): ?Response
    {
        return new JsonResponse([
            'error' => 'Authentication failed',
            'message' => $exception->getMessage()
        ], Response::HTTP_UNAUTHORIZED);
    }
}
