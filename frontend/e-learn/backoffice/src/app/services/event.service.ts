import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Event, EventType } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private readonly baseUrl = 'http://localhost:8085/api/events';

  constructor(private readonly http: HttpClient) {}

  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(this.baseUrl);
  }

  getEventById(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.baseUrl}/${id}`);
  }

  createEvent(payload: Partial<Event>): Observable<Event> {
    return this.http.post<Event>(this.baseUrl, payload);
  }

  updateEvent(id: number, payload: Partial<Event>): Observable<Event> {
    return this.http.put<Event>(`${this.baseUrl}/${id}`, payload);
  }

  deleteEvent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  registerUser(eventId: number, userId: number): Observable<string> {
    return this.http.post<string>(`${this.baseUrl}/${eventId}/registerUser`, null, {
      params: { userId: String(userId) }
    });
  }

  unregisterUser(eventId: number, userId: number): Observable<string> {
    return this.http.delete<string>(`${this.baseUrl}/${eventId}/unregisterUser`, {
      params: { userId: String(userId) }
    });
  }

  getParticipants(eventId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.baseUrl}/${eventId}/participants`);
  }

  getAvailableEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/available`);
  }

  getPopularEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/popular`);
  }

  countParticipantsByFormateurId(formateurId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/statistics/formateur/${formateurId}`);
  }

  searchEvents(type: EventType, keyword: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/search`, {
      params: {
        type,
        keyword
      }
    });
  }

  getEventsByParticipant(userId: number): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/participant/${userId}`);
  }

  findConflicts(formateurId: number, startDate: string, endDate: string): Observable<Event[]> {
    return this.http.get<Event[]>(`${this.baseUrl}/conflicts`, {
      params: {
        formateurId: String(formateurId),
        startDate,
        endDate
      }
    });
  }
}
