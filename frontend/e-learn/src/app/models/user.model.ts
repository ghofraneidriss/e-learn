export interface User {
  id?: string;
  keycloakId: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'PROF' | 'ETUDIANT';
  createdAt?: Date;
}

export interface UserProfile {
  sub: string;
  email: string;
  name: string;
  preferred_username: string;
  given_name?: string;
  family_name?: string;
  roles: string[];
}
