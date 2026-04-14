import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cours } from '../models/cours.model';

@Injectable({ providedIn: 'root' })
export class CoursService {
  private readonly apiUrl = 'http://localhost:8085/api/cours';

  constructor(private readonly http: HttpClient) { }

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

  getTopCours(): Observable<Cours[]> {
    return this.http.get<Cours[]>(`${this.apiUrl}/top`);
  }

  getSummary(id: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${id}/summary`, { responseType: 'text' });
  }

  uploadImage(id: number, file: File): Observable<string> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/upload-image`, fd, { responseType: 'text' });
  }

  uploadVideo(id: number, file: File): Observable<string> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(`${this.apiUrl}/${id}/upload-video`, fd, { responseType: 'text' });
  }
}
