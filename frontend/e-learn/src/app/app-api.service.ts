import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface KeycloakTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_expires_in: number;
  refresh_token: string;
  token_type: string;
  scope: string;
}

export interface Course {
  id: number;
  title: string;
  description?: string;
  duration?: number;
  level?: string;
  teacherName?: string;
}

export interface Quiz {
  id: number;
  title: string;
  description?: string;
  courseId?: number | null;
  questions: string[];
}

export interface CoursePayload {
  title: string;
  description?: string;
  duration?: number | null;
  level?: string;
  teacherName?: string;
}

export interface QuizPayload {
  title: string;
  description?: string;
  questions: string[];
}

@Injectable({
  providedIn: 'root',
})
export class AppApiService {
  private readonly gatewayBase = '/api';
  private readonly keycloakTokenUrl =
    'http://localhost:8081/realms/elearn-realm/protocol/openid-connect/token';

  constructor(private http: HttpClient) {}

  login(username: string, password: string, clientId = 'elearn-client'): Observable<KeycloakTokenResponse> {
    const body = this.toFormBody({
      client_id: clientId,
      username,
      password,
      grant_type: 'password',
    });

    return this.http.post<KeycloakTokenResponse>(this.keycloakTokenUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
    });
  }

  getCourses(token: string): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.gatewayBase}/cours`, {
      headers: this.authHeaders(token),
    });
  }

  createCourse(token: string, payload: CoursePayload): Observable<Course> {
    return this.http.post<Course>(`${this.gatewayBase}/cours`, payload, {
      headers: this.authHeaders(token),
    });
  }

  getQuizzes(token: string): Observable<Quiz[]> {
    return this.http.get<Quiz[]>(`${this.gatewayBase}/quizzes`, {
      headers: this.authHeaders(token),
    });
  }

  createQuiz(token: string, payload: QuizPayload): Observable<Quiz> {
    return this.http.post<Quiz>(`${this.gatewayBase}/quizzes`, payload, {
      headers: this.authHeaders(token),
    });
  }

  assignQuiz(token: string, quizId: number, courseId: number): Observable<Quiz> {
    return this.http.put<Quiz>(`${this.gatewayBase}/quizzes/${quizId}/assign/${courseId}`, {}, {
      headers: this.authHeaders(token),
    });
  }

  deleteQuiz(token: string, quizId: number): Observable<void> {
    return this.http.delete<void>(`${this.gatewayBase}/quizzes/${quizId}`, {
      headers: this.authHeaders(token),
    });
  }

  private authHeaders(token: string): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  private toFormBody(values: Record<string, string>): string {
    return Object.entries(values)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');
  }
}
