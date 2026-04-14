import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-form',
  standalone: false,
  templateUrl: './feedback-form.component.html',
  styleUrls: ['./feedback-form.component.css']
})
export class FeedbackFormComponent implements OnInit {
  feedbackForm: FormGroup;
  isEditMode = false;
  feedbackId: number | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly fb: FormBuilder,
    private readonly feedbackService: FeedbackService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {
    this.feedbackForm = this.fb.group({
      userName: ['', [Validators.required]],
      userEmail: ['', [Validators.required, Validators.email]],
      title: ['', [Validators.required]],
      message: ['', [Validators.required]],
      comment: ['', [Validators.required]],
      imageUrl: [''],
      rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  listening = false;
  speechSupported = typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window);
  private speechRecognition: any = null;

  startSpeechInput(fieldName: string): void {
    if (!this.speechSupported) return;
    const win = window as any;
    const SpeechRecognitionCtor = win.SpeechRecognition ?? win.webkitSpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    this.listening = true;
    this.speechRecognition = new SpeechRecognitionCtor();
    this.speechRecognition.lang = 'fr-FR';
    this.speechRecognition.interimResults = false;

    this.speechRecognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
      this.feedbackForm.get(fieldName)?.setValue(transcript);
    };

    this.speechRecognition.onend = () => { this.listening = false; };
    this.speechRecognition.start();
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.feedbackId = +id;
      this.loadFeedback(this.feedbackId);
    }
  }

  setRating(rating: number): void {
    this.feedbackForm.get('rating')?.setValue(rating);
  }

  loadFeedback(id: number): void {
    this.loading = true;
    this.feedbackService.getById(id).subscribe({
      next: (feedback) => {
        this.feedbackForm.patchValue(feedback);
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load feedback details.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onSubmit(): void {
    if (this.feedbackForm.invalid) {
      this.feedbackForm.markAllAsTouched();
      return;
    }

    this.loading = true;
    const formVal = this.feedbackForm.value;
    const feedbackData: Feedback = { 
        ...formVal, 
        id: this.feedbackId || undefined,
        user: formVal.userName,
        message: formVal.comment
    };

    if (this.isEditMode && this.feedbackId) {
      this.feedbackService.update(this.feedbackId, feedbackData).subscribe({
        next: () => {
          this.router.navigate(['/frontoffice/feedbacks']);
        },
        error: (err) => {
          this.errorMessage = 'Failed to update feedback.';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      this.feedbackService.create(feedbackData).subscribe({
        next: () => {
          this.router.navigate(['/frontoffice/feedbacks']);
        },
        error: (err) => {
          this.errorMessage = 'Failed to create feedback.';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
}
