# Integration Guide: Symfony User Service with Spring Cloud Microservices

## 🎯 Overview

This guide explains how to integrate the Symfony-based user service with the existing Spring Cloud microservices architecture.

## 🏗️ Architecture Integration

```
┌─────────────────────────────────────────────────────────────────┐
│                     E-Learning Platform                          │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │  Eureka Server   │
                    │   (Port 8761)    │
                    └──────────────────┘
                              │
                ┌─────────────┼─────────────┐
                │             │             │
                ▼             ▼             ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │Config Server │ │  API Gateway │ │   Keycloak   │
        │ (Port 8888)  │ │ (Port 8085)  │ │ (Port 8081)  │
        └──────────────┘ └──────────────┘ └──────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ▼                     ▼                     ▼
┌──────────────┐      ┌──────────────┐     ┌──────────────┐
│  Cours MS    │      │Inscription MS│     │ User Service │
│ (Port 8060)  │      │ (Port 8081)  │     │ (Port 8000)  │
│   Spring     │      │   Spring     │     │   Symfony    │
│     H2       │      │     H2       │     │   MongoDB    │
└──────────────┘      └──────────────┘     └──────────────┘
```

## 🔄 Integration Points

### 1. API Gateway Routing

The Symfony service is integrated through the Spring Cloud Gateway.

**Configuration**: `backend/config-server/src/main/resources/config/gateway.properties`

```properties
# User Service Route (Symfony)
spring.cloud.gateway.routes[4].id=USERS
spring.cloud.gateway.routes[4].uri=http://localhost:8000
spring.cloud.gateway.routes[4].predicates[0]=Path=/api/users,/api/users/**,/api/health
```

**Access Pattern**:
- Direct: `http://localhost:8000/api/users`
- Via Gateway: `http://localhost:8085/api/users`

### 2. Service Discovery (Optional)

The Symfony service does NOT register with Eureka (it's not a Spring service). Instead:
- Gateway routes directly to `http://localhost:8000`
- This is a valid pattern for polyglot microservices

**Alternative**: If you want Eureka integration, you can:
1. Create a thin Spring Boot wrapper around Symfony
2. Use a sidecar pattern
3. Use Consul or other service mesh

### 3. Authentication Flow

```
┌─────────┐         ┌──────────┐         ┌─────────┐         ┌──────────┐
│ Angular │────────▶│ Keycloak │────────▶│ Gateway │────────▶│ Symfony  │
│         │  Login  │          │  Token  │         │  Bearer │          │
└─────────┘         └──────────┘         └─────────┘         └──────────┘
     │                    │                    │                    │
     │                    │                    │                    │
     │◀───────────────────┘                    │                    │
     │      JWT Token                          │                    │
     │                                         │                    │
     │─────────────────────────────────────────┼───────────────────▶│
     │         API Request + Bearer Token      │                    │
     │                                         │                    │
     │◀────────────────────────────────────────┼────────────────────┘
     │              User Data                  │
```

**Flow**:
1. User logs in via Angular → Keycloak
2. Keycloak returns JWT token
3. Angular stores token
4. Angular sends requests with `Authorization: Bearer <token>`
5. Gateway forwards request to Symfony
6. Symfony validates token with Keycloak public key
7. Symfony processes request and returns data

### 4. Inter-Service Communication

#### From Spring Services to Symfony User Service

**Using RestTemplate**:

```java
@Service
public class UserClient {
    
    @Autowired
    private RestTemplate restTemplate;
    
    public UserDTO getUserById(String userId, String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        
        ResponseEntity<UserDTO> response = restTemplate.exchange(
            "http://localhost:8000/api/users/" + userId,
            HttpMethod.GET,
            entity,
            UserDTO.class
        );
        
        return response.getBody();
    }
}
```

**Using OpenFeign** (Recommended):

```java
@FeignClient(name = "user-service", url = "http://localhost:8000")
public interface UserServiceClient {
    
    @GetMapping("/api/users/{id}")
    UserDTO getUserById(
        @PathVariable("id") String id,
        @RequestHeader("Authorization") String token
    );
    
    @GetMapping("/api/users/me")
    UserDTO getCurrentUser(@RequestHeader("Authorization") String token);
}
```

**Usage in Service**:

```java
@Service
public class InscriptionService {
    
    @Autowired
    private UserServiceClient userServiceClient;
    
    public InscriptionDetails getInscriptionWithUser(Long inscriptionId, String token) {
        Inscription inscription = inscriptionRepository.findById(inscriptionId)
            .orElseThrow(() -> new ResourceNotFoundException("Inscription not found"));
        
        // Call Symfony user service
        UserDTO user = userServiceClient.getUserById(
            inscription.getUserId(), 
            "Bearer " + token
        );
        
        return new InscriptionDetails(inscription, user);
    }
}
```

#### From Symfony to Spring Services

**Using Symfony HTTP Client**:

```php
<?php

namespace App\Service;

use Symfony\Contracts\HttpClient\HttpClientInterface;

class CoursService
{
    public function __construct(
        private readonly HttpClientInterface $httpClient
    ) {
    }

    public function getCoursById(int $coursId, string $token): array
    {
        $response = $this->httpClient->request('GET', 
            'http://localhost:8085/cours/' . $coursId,
            [
                'headers' => [
                    'Authorization' => 'Bearer ' . $token,
                ],
            ]
        );

        return $response->toArray();
    }
}
```

### 5. Database Strategy

**Polyglot Persistence**:
- Spring services: H2 (dev) / PostgreSQL (prod)
- Symfony service: MongoDB

**Benefits**:
- Each service uses the best database for its needs
- User data (documents, flexible schema) → MongoDB
- Course/Inscription data (relational) → SQL

**Data Consistency**:
- Use eventual consistency
- Sync user data from Keycloak as source of truth
- Use events/messaging for cross-service updates (future)

## 🚀 Startup Sequence

### Development Environment

```bash
# 1. Start infrastructure
docker-compose up -d  # MongoDB + Keycloak

# 2. Start Spring services (from backend/)
./mvnw -pl eureka-server spring-boot:run &
./mvnw -pl config-server spring-boot:run &
./mvnw -pl cours-ms spring-boot:run &
./mvnw -pl inscription-ms spring-boot:run &
./mvnw -pl gateway spring-boot:run &

# 3. Start Symfony service
cd user-service-symfony
symfony server:start --port=8000 &

# 4. Start Angular frontend
cd ../../frontend
npm start
```

### Verification

```bash
# Check all services are up
curl http://localhost:8761  # Eureka
curl http://localhost:8888/actuator/health  # Config Server
curl http://localhost:8085/actuator/health  # Gateway
curl http://localhost:8060/cours  # Cours MS
curl http://localhost:8081/inscriptions  # Inscription MS
curl http://localhost:8000/api/health  # User Service (Symfony)
curl http://localhost:8081  # Keycloak
```

## 🔐 Security Integration

### Gateway Security (Optional Enhancement)

You can add Keycloak security to the Gateway itself:

**Add to `gateway/pom.xml`**:

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-oauth2-resource-server</artifactId>
</dependency>
```

**Add to `gateway/src/main/resources/application.properties`**:

```properties
spring.security.oauth2.resourceserver.jwt.issuer-uri=http://localhost:8081/realms/elearning
spring.security.oauth2.resourceserver.jwt.jwk-set-uri=http://localhost:8081/realms/elearning/protocol/openid-connect/certs
```

This way, the Gateway validates tokens before forwarding to services.

### Token Propagation

When services call each other, they should propagate the token:

```java
@Component
public class FeignClientInterceptor implements RequestInterceptor {
    
    @Override
    public void apply(RequestTemplate template) {
        ServletRequestAttributes attributes = 
            (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        
        if (attributes != null) {
            HttpServletRequest request = attributes.getRequest();
            String token = request.getHeader("Authorization");
            
            if (token != null) {
                template.header("Authorization", token);
            }
        }
    }
}
```

## 📊 Monitoring & Observability

### Health Checks

All services expose health endpoints:

```bash
# Spring services
curl http://localhost:8085/actuator/health

# Symfony service
curl http://localhost:8000/api/health
```

### Centralized Logging (Future)

Consider adding:
- ELK Stack (Elasticsearch, Logstash, Kibana)
- Grafana + Prometheus
- Zipkin for distributed tracing

## 🧪 Testing Integration

### End-to-End Test

```bash
#!/bin/bash

# 1. Get token from Keycloak
TOKEN=$(curl -s -X POST "http://localhost:8081/realms/elearning/protocol/openid-connect/token" \
  -d "client_id=elearning-client" \
  -d "client_secret=YOUR_SECRET" \
  -d "username=student1" \
  -d "password=student123" \
  -d "grant_type=password" | jq -r '.access_token')

echo "Token: $TOKEN"

# 2. Call user service via gateway
echo "\n=== Get Current User ==="
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8085/api/users/me | jq

# 3. Call cours service via gateway
echo "\n=== Get Courses ==="
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8085/cours | jq

# 4. Call inscription service via gateway
echo "\n=== Get Inscriptions ==="
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:8085/inscriptions | jq
```

## 🔄 Data Synchronization

### User Sync Strategy

**On First Login**:
1. User logs in via Keycloak
2. Angular gets token
3. Angular calls `/api/users/me`
4. Symfony extracts user info from token
5. Symfony checks if user exists in MongoDB
6. If not, creates user record
7. Returns user data

**Periodic Sync** (Optional):

Create a scheduled task in Symfony:

```php
<?php

namespace App\Command;

use App\Service\KeycloakSyncService;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class SyncUsersCommand extends Command
{
    protected static $defaultName = 'app:sync-users';

    public function __construct(
        private readonly KeycloakSyncService $syncService
    ) {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('Syncing users from Keycloak...');
        
        $count = $this->syncService->syncAllUsers();
        
        $output->writeln("Synced $count users successfully.");
        
        return Command::SUCCESS;
    }
}
```

## 📝 Best Practices

### 1. Error Handling

Ensure consistent error responses across services:

**Spring Services**:
```json
{
  "timestamp": "2024-01-01T00:00:00",
  "status": 404,
  "error": "Not Found",
  "message": "Resource not found",
  "path": "/cours/999"
}
```

**Symfony Service**:
```json
{
  "success": false,
  "error": "User not found",
  "timestamp": "2024-01-01T00:00:00"
}
```

### 2. API Versioning

Consider adding version prefixes:
- `/api/v1/users`
- `/api/v1/cours`

### 3. Rate Limiting

Add rate limiting at Gateway level using Spring Cloud Gateway filters.

### 4. Caching

- Use Redis for shared cache
- Cache user data in Symfony
- Cache course data in Spring services

## 🚀 Production Considerations

### 1. Service Discovery

For production, consider:
- Registering Symfony service with Eureka using a sidecar
- Using Kubernetes service discovery
- Using Consul

### 2. Load Balancing

- Multiple instances of each service
- Gateway load balances automatically for Spring services
- Use Kubernetes/Docker Swarm for Symfony instances

### 3. Database

- MongoDB replica set for high availability
- PostgreSQL for Spring services
- Regular backups

### 4. Security

- HTTPS everywhere
- Keycloak with PostgreSQL backend
- Secrets management (Vault, AWS Secrets Manager)

## 📚 Additional Resources

- [Spring Cloud Gateway Documentation](https://spring.io/projects/spring-cloud-gateway)
- [Symfony HTTP Client](https://symfony.com/doc/current/http_client.html)
- [Keycloak Integration](https://www.keycloak.org/docs/latest/securing_apps/)
- [Microservices Patterns](https://microservices.io/patterns/)

## ✅ Integration Checklist

- [ ] Gateway routes configured for user service
- [ ] Keycloak realm and client configured
- [ ] MongoDB running and accessible
- [ ] Symfony service validates Keycloak tokens
- [ ] CORS configured for Angular
- [ ] Health checks working
- [ ] Inter-service communication tested
- [ ] Error handling consistent
- [ ] Documentation updated

---

**Integration Complete!** 🎉 Your Symfony user service is now fully integrated with the Spring Cloud microservices architecture.
