import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private readonly baseUrl = 'http://localhost:8085/reclamations';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.baseUrl);
  }

  create(payload: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.baseUrl, payload);
  }

  update(id: number, payload: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.baseUrl}/${id}`, payload);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
