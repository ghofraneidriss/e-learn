export type StatutAbonnement = 'ACTIF' | 'EXPIRE' | 'ANNULE';
export type MethodePaiement = 'CARTE_BANCAIRE' | 'PAYPAL' | 'VIREMENT';
export type StatutPaiement = 'EN_ATTENTE' | 'PAYE' | 'ECHEC';

export interface Abonnement {
  id: number;
  userEmail: string;
  offreId: number;
  offreNom: string;
  montantPaye: number;
  statut: StatutAbonnement;
  methodePaiement: MethodePaiement;
  statutPaiement: StatutPaiement;
  referenceTransaction: string;
  nomTitulaire: string;
  dateDebut: string;
  dateFin: string;
  createdAt: string;
}

export interface AbonnementRequest {
  offreId: number;
  methodePaiement: MethodePaiement;
  nomTitulaire: string;
}
