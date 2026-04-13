export type EventType = 'WEBINAIRE' | 'EXAMEN' | 'ATELIER' | 'HACKATHON';

export interface Event {
  id?: number;
  nom: string;
  description: string;
  type: EventType;
  date: string;
  dateFin?: string | null;
  lieu: string;
  capaciteMax: number;
  formateurId?: number;
  participantsIds?: number[];
}
