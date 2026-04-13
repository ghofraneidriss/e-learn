import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../models/cours.model';

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:8085/api/cours'; // Connecting to the API Gateway

  constructor(private http: HttpClient) { }

  getAllCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(this.apiUrl);
  }

  getCoursById(id: number): Observable<Cours> {
    return this.http.get<Cours>(`${this.apiUrl}/${id}`);
  }

  createCours(cours: Cours): Observable<Cours> {
    return this.http.post<Cours>(this.apiUrl, cours);
  }

  updateCours(id: number, cours: Cours): Observable<Cours> {
    return this.http.put<Cours>(`${this.apiUrl}/${id}`, cours);
  }

  deleteCours(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
