import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event, EventType } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-frontoffice-event-showcase',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-showcase.component.html',
  styleUrl: './event-showcase.component.css'
})
export class EventShowcaseFrontofficePageComponent implements OnInit {
  events: Event[] = [];
  featured: Event[] = [];
  availableEvents: Event[] = [];
  filteredEvents: Event[] = [];
  message = '';
  searchForm: FormGroup;
  registrationForm: FormGroup;
  eventTypes: (EventType | 'ALL')[] = ['ALL', 'WEBINAIRE', 'EXAMEN', 'ATELIER', 'HACKATHON'];

  constructor(private readonly eventService: EventService, private readonly fb: FormBuilder) {
    this.searchForm = this.fb.group({
      type: ['ALL'],
      keyword: ['']
    });
    this.registrationForm = this.fb.group({
      userId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadEvents();
    this.loadFeatured();
    this.loadAvailable();
  }

  private loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data ?? [];
        this.filteredEvents = [...this.events];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  private loadFeatured(): void {
    this.eventService.getPopularEvents().subscribe({
      next: (data) => (this.featured = data ?? []),
      error: (err) => {
        console.error(err);
        this.featured = [];
      }
    });
  }

  private loadAvailable(): void {
    this.eventService.getAvailableEvents().subscribe({
      next: (data) => (this.availableEvents = data ?? []),
      error: (err) => {
        console.error(err);
        this.availableEvents = [];
      }
    });
  }

  applyFilter(): void {
    const type = this.searchForm.value.type;
    const keyword = (this.searchForm.value.keyword ?? '').toLowerCase().trim();
    this.filteredEvents = this.events.filter((event) => {
      const matchesType = type === 'ALL' || event.type === type;
      const matchesKeyword =
        !keyword ||
        event.nom.toLowerCase().includes(keyword) ||
        event.description.toLowerCase().includes(keyword);
      return matchesType && matchesKeyword;
    });
  }

  registerToEvent(eventId: number): void {
    if (this.registrationForm.invalid) {
      this.message = 'Veuillez renseigner votre ID utilisateur.';
      return;
    }

    const userId = Number(this.registrationForm.value.userId);
    this.eventService.registerUser(eventId, userId).subscribe({
      next: (msg) => {
        this.message = msg;
        this.loadEvents();
        this.loadAvailable();
      },
      error: (err) => {
        console.error(err);
        this.message = 'Inscription impossible pour le moment.';
      }
    });
  }

  unregisterFromEvent(eventId: number): void {
    if (this.registrationForm.invalid) {
      this.message = 'Veuillez renseigner votre ID utilisateur.';
      return;
    }

    const userId = Number(this.registrationForm.value.userId);
    this.eventService.unregisterUser(eventId, userId).subscribe({
      next: (msg) => {
        this.message = msg;
        this.loadEvents();
        this.loadAvailable();
      },
      error: (err) => {
        console.error(err);
        this.message = 'La désinscription a échoué.';
      }
    });
  }
}
