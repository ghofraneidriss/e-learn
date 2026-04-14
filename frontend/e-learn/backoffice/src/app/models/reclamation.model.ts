export type ReclamationStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED' | 'REJECTED';

export interface Reclamation {
  id?: number;
  subject: string;
  description: string;
  status: string | ReclamationStatus;
  userName?: string;
  userEmail?: string;
  imageUrl?: string;
  createdAt?: string;
}
