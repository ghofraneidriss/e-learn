import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-detail',
  standalone: false,
  templateUrl: './feedback-detail.component.html',
  styleUrls: ['./feedback-detail.component.css']
})
export class FeedbackDetailComponent implements OnInit {
  feedback: Feedback | null = null;
  loading = false;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadFeedback(+id);
    }
  }

  loadFeedback(id: number): void {
    this.loading = true;
    this.feedbackService.getById(id).subscribe({
      next: (data) => {
        this.feedback = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load feedback details.';
        this.loading = false;
        console.error(err);
      }
    });
  }
}
