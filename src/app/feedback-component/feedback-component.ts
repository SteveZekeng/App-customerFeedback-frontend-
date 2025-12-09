import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';
import {Feedback} from '../modele/feedback.model';
import {FeedbackService} from '../service/feedback.service';

@Component({
  selector: 'app-feedback-component',
  imports: [],
  templateUrl: './feedback-component.html',
  styleUrl: './feedback-component.scss',
})
export class FeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  loading = false;
  errorMsg = '';

  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.feedbackService.getAllFeedback()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges()
      }))
      .subscribe({
        next: data => { this.feedbackList = data; },
        error: () => { this.errorMsg = 'Erreur lors du chargement.'; }
      });
  }


  delete(id: number) {
    if (confirm('Êtes-vous sûr ?')) {
      this.feedbackService.deleteFeedback(id).subscribe(() =>
        this.loadFeedbacks())
      console.log('Feedback supprimé avec succes')
    }
  }

  viewDetail(id: number) {
    this.router.navigate(['/feedback', id]);
  }

}
