import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../models/feedback.model';

@Component({
  selector: 'app-feedback-list',
  standalone: false,
  templateUrl: './feedback-list.component.html',
  styleUrls: ['./feedback-list.component.css']
})
export class FeedbackListComponent implements OnInit {
  feedbacks: Feedback[] = [];
  loading = false;
  errorMessage = '';
  successMessage = '';

  constructor(private readonly feedbackService: FeedbackService) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.feedbackService.getAll().subscribe({
      next: (data) => {
        this.feedbacks = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Failed to load feedbacks.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  deleteFeedback(id: number | undefined): void {
    if (id === undefined) return;
    if (!confirm('Are you sure you want to delete this feedback?')) return;
    
    this.feedbackService.delete(id).subscribe({
      next: () => {
        this.successMessage = 'Feedback deleted successfully.';
        this.loadFeedbacks();
      },
      error: (err) => {
        this.errorMessage = 'Failed to delete feedback.';
        console.error(err);
      }
    });
  }

  shareOnWhatsapp(fb: Feedback): void {
    const text = encodeURIComponent(`Feedback on Eduact\nTitle: ${fb.title}\nRating: ${fb.rating}/5\nComment: ${fb.comment}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  }

  shareOnTelegram(fb: Feedback): void {
    const text = encodeURIComponent(`Feedback on Eduact\nTitle: ${fb.title}\nRating: ${fb.rating}/5\nComment: ${fb.comment}`);
    window.open(`https://t.me/share/url?text=${text}`, '_blank');
  }
}
