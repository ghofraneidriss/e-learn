import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8085/api/cours';

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.baseUrl);
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${id}`);
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.baseUrl, course);
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/${id}`, course);
  }

  deleteCourse(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getSummary(id: number): Observable<string> {
    return this.http.get(`${this.baseUrl}/${id}/summary`, { responseType: 'text' });
  }

  getTopCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/top`);
  }

  generateCaption(title: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/generate-caption?title=${title}`, {}, { responseType: 'text' });
  }

  uploadImage(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/${id}/upload-image`, formData, { responseType: 'text' });
  }

  uploadVideo(id: number, file: File): Observable<string> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.baseUrl}/${id}/upload-video`, formData, { responseType: 'text' });
  }
}
