import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abonnement, AbonnementRequest } from '../models/abonnement.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AbonnementService {
  private readonly API = `${environment.apiUrl}/abonnements`;

  constructor(private http: HttpClient) {}

  getMesAbonnements(): Observable<Abonnement[]> {
    return this.http.get<Abonnement[]>(`${this.API}/mes-abonnements`);
  }

  getAllAbonnements(): Observable<Abonnement[]> {
    return this.http.get<Abonnement[]>(this.API);
  }

  souscrire(request: AbonnementRequest): Observable<Abonnement> {
    return this.http.post<Abonnement>(this.API, request);
  }

  annuler(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${id}/annuler`, {});
  }
}
