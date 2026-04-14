import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reclamation } from '../models/reclamation.model';

@Injectable({
  providedIn: 'root'
})
export class ReclamationService {
  private readonly baseUrl = 'http://localhost:8085/api/reclamations';

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<Reclamation[]> {
    return this.http.get<Reclamation[]>(this.baseUrl);
  }

  getById(id: number): Observable<Reclamation> {
    return this.http.get<Reclamation>(`${this.baseUrl}/${id}`);
  }

  create(data: Reclamation): Observable<Reclamation> {
    return this.http.post<Reclamation>(this.baseUrl, data);
  }

  update(id: number, data: Reclamation): Observable<Reclamation> {
    return this.http.put<Reclamation>(`${this.baseUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
