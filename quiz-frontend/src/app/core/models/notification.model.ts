export interface Notification {
  id: number;
  message: string;
  type: string;
  userId: string;
  offreId?: number;
  lu: boolean;
  createdAt: string;
}
