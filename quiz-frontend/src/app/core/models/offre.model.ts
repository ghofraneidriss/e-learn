export type TypeOffre = 'BASIC' | 'PREMIUM' | 'VIP';
export type NiveauAcces = 'DEBUTANT' | 'INTERMEDIAIRE' | 'AVANCE';

export interface Offre {
  id: number;
  nom: string;
  description: string;
  prix: number;
  dureeEnMois: number;
  type: TypeOffre;
  niveau: NiveauAcces;
  nombreCoursInclus: number;
  nombreQuizInclus: number;
  matieres: string[];
  avantages: string[];
  actif: boolean;
  createdAt: string;
  createurEmail?: string;
}

export interface OffreRequest {
  nom: string;
  description: string;
  prix: number;
  dureeEnMois: number;
  type: TypeOffre;
  niveau: NiveauAcces;
  nombreCoursInclus: number;
  nombreQuizInclus: number;
  matieres: string[];
  avantages: string[];
}
