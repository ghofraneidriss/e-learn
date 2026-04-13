import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8085/api/cours';

  constructor(private http: HttpClient) {}

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  getSummary(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}/summary`, { responseType: 'text' });
  }

  getTopCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/top`);
  }
}
