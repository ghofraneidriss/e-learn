import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offre, OffreRequest } from '../models/offre.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class OffreService {
  private readonly API = `${environment.apiUrl}/offres`;

  constructor(private http: HttpClient) {}

  getOffresActives(): Observable<Offre[]> {
    return this.http.get<Offre[]>(this.API);
  }

  getAllOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.API}/all`);
  }

  getMesOffres(): Observable<Offre[]> {
    return this.http.get<Offre[]>(`${this.API}/mes-offres`);
  }

  getOffre(id: number): Observable<Offre> {
    return this.http.get<Offre>(`${this.API}/${id}`);
  }

  createOffre(request: OffreRequest): Observable<Offre> {
    return this.http.post<Offre>(this.API, request);
  }

  updateOffre(id: number, request: OffreRequest): Observable<Offre> {
    return this.http.put<Offre>(`${this.API}/${id}`, request);
  }

  toggleActif(id: number): Observable<void> {
    return this.http.patch<void>(`${this.API}/${id}/toggle-actif`, {});
  }

  deleteOffre(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
