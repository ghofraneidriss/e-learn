import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Event, EventType } from '../../models/event.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-management-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './event-management.component.html',
  styleUrl: './event-management.component.css'
})
export class EventManagementPageComponent implements OnInit {
  events: Event[] = [];
  availableEvents: Event[] = [];
  popularEvents: Event[] = [];
  searchResults: Event[] = [];
  conflictEvents: Event[] = [];
  participantEvents: Event[] = [];
  registerMessage = '';
  statResult: number | null = null;
  statusMessage = '';
  selectedEvent: Event | null = null;
  isSaving = false;
  eventTypes: EventType[] = ['WEBINAIRE', 'EXAMEN', 'ATELIER', 'HACKATHON'];

  eventForm: FormGroup;
  statForm: FormGroup;
  searchForm: FormGroup;
  conflictForm: FormGroup;
  participantForm: FormGroup;
  registerForm: FormGroup;

  constructor(private readonly fb: FormBuilder, private readonly eventService: EventService) {
    this.eventForm = this.fb.group({
      nom: ['', Validators.required],
      description: [''],
      type: ['WEBINAIRE', Validators.required],
      date: ['', Validators.required],
      dateFin: [''],
      lieu: ['', Validators.required],
      capaciteMax: [20, [Validators.required, Validators.min(1)]],
      formateurId: ['', Validators.required]
    });

    this.statForm = this.fb.group({
      formateurId: [null, Validators.required]
    });

    this.searchForm = this.fb.group({
      type: ['WEBINAIRE', Validators.required],
      keyword: ['']
    });

    this.conflictForm = this.fb.group({
      formateurId: [null, Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });

    this.participantForm = this.fb.group({
      userId: [null, Validators.required]
    });

    this.registerForm = this.fb.group({
      eventId: [null, Validators.required],
      userId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.refreshAll();
  }

  private refreshAll(): void {
    this.loadEvents();
    this.loadAvailableEvents();
    this.loadPopularEvents();
  }

  private loadEvents(): void {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data ?? [];
        this.statusMessage = '';
      },
      error: (err) => {
        console.error(err);
        this.statusMessage = 'Impossible de charger la liste des événements.';
      }
    });
  }

  private loadAvailableEvents(): void {
    this.eventService.getAvailableEvents().subscribe({
      next: (data) => (this.availableEvents = data ?? []),
      error: (err) => {
        console.error(err);
        this.availableEvents = [];
      }
    });
  }

  private loadPopularEvents(): void {
    this.eventService.getPopularEvents().subscribe({
      next: (data) => (this.popularEvents = data ?? []),
      error: (err) => {
        console.error(err);
        this.popularEvents = [];
      }
    });
  }

  saveEvent(): void {
    if (this.eventForm.invalid) {
      return;
    }

    this.isSaving = true;
    const formValue = this.eventForm.value;
    const payload: Partial<Event> = {
      nom: formValue.nom,
      description: formValue.description,
      type: formValue.type,
      date: formValue.date,
      dateFin: formValue.dateFin || null,
      lieu: formValue.lieu,
      capaciteMax: Number(formValue.capaciteMax),
      formateurId: Number(formValue.formateurId),
      participantsIds: this.selectedEvent?.participantsIds ?? []
    };

    const request = this.selectedEvent?.id
      ? this.eventService.updateEvent(this.selectedEvent.id, payload)
      : this.eventService.createEvent(payload);

    request.subscribe({
      next: () => {
        this.isSaving = false;
        this.statusMessage = `Événement ${this.selectedEvent ? 'mis à jour' : 'créé'} avec succès.`;
        this.resetForm();
        this.refreshAll();
      },
      error: (err) => {
        console.error(err);
        this.isSaving = false;
        this.statusMessage = 'Une erreur est survenue ; vérifiez les informations saisies.';
      }
    });
  }

  setForEdit(event: Event): void {
    this.selectedEvent = event;
    this.eventForm.patchValue({
      nom: event.nom,
      description: event.description,
      type: event.type,
      date: this.formatForInput(event.date),
      dateFin: this.formatForInput(event.dateFin ?? ''),
      lieu: event.lieu,
      capaciteMax: event.capaciteMax,
      formateurId: event.formateurId ?? ''
    });
  }

  resetForm(): void {
    this.selectedEvent = null;
    this.eventForm.reset({
      nom: '',
      description: '',
      type: 'WEBINAIRE',
      date: '',
      dateFin: '',
      lieu: '',
      capaciteMax: 20,
      formateurId: ''
    });
  }

  deleteEvent(event: Event): void {
    if (!event.id) {
      return;
    }

    this.eventService.deleteEvent(event.id).subscribe({
      next: () => {
        this.statusMessage = 'Événement supprimé.';
        this.refreshAll();
      },
      error: (err) => {
        console.error(err);
        this.statusMessage = 'Impossible de supprimer l’événement.';
      }
    });
  }

  searchEvents(): void {
    if (this.searchForm.invalid) {
      return;
    }

    const { type, keyword } = this.searchForm.value;
    this.eventService.searchEvents(type, keyword?.trim() ?? '').subscribe({
      next: (data) => (this.searchResults = data ?? []),
      error: (err) => {
        console.error(err);
        this.searchResults = [];
      }
    });
  }

  fetchStats(): void {
    if (this.statForm.invalid) {
      return;
    }

    const formateurId = Number(this.statForm.value.formateurId);
    this.eventService.countParticipantsByFormateurId(formateurId).subscribe({
      next: (count) => (this.statResult = count),
      error: (err) => {
        console.error(err);
        this.statResult = null;
      }
    });
  }

  checkConflicts(): void {
    if (this.conflictForm.invalid) {
      return;
    }

    const { formateurId, startDate, endDate } = this.conflictForm.value;
    this.eventService.findConflicts(Number(formateurId), startDate, endDate).subscribe({
      next: (data) => (this.conflictEvents = data ?? []),
      error: (err) => {
        console.error(err);
        this.conflictEvents = [];
      }
    });
  }

  loadParticipantEvents(): void {
    if (this.participantForm.invalid) {
      return;
    }

    const userId = Number(this.participantForm.value.userId);
    this.eventService.getEventsByParticipant(userId).subscribe({
      next: (data) => (this.participantEvents = data ?? []),
      error: (err) => {
        console.error(err);
        this.participantEvents = [];
      }
    });
  }

  registerUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { eventId, userId } = this.registerForm.value;
    this.eventService.registerUser(Number(eventId), Number(userId)).subscribe({
      next: (message) => {
        this.registerMessage = message;
        this.refreshAll();
      },
      error: (err) => {
        console.error(err);
        this.registerMessage = 'Impossible d’inscrire l’utilisateur.';
      }
    });
  }

  unregisterUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    const { eventId, userId } = this.registerForm.value;
    this.eventService.unregisterUser(Number(eventId), Number(userId)).subscribe({
      next: (message) => {
        this.registerMessage = message;
        this.refreshAll();
      },
      error: (err) => {
        console.error(err);
        this.registerMessage = 'Impossible de désinscrire l’utilisateur.';
      }
    });
  }

  private formatForInput(value: string | undefined): string {
    if (!value) {
      return '';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    const offset = date.getTimezoneOffset() * 60000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 16);
  }
}
