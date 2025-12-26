import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FeedbackService} from '../../core/service/feedback.service';
import {Feedback} from '../modele/feedback.model';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-feedback-detail-component',
  imports: [
    DecimalPipe
  ],
  templateUrl: './feedback-detail-component.html',
  styleUrl: './feedback-detail-component.scss',
})
export class FeedbackDetailComponent implements OnInit {

  feedback!: Feedback;
  loading = true;
  errorMsg = '';
  id!: number;
  averageScore!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private feedbackService: FeedbackService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.loadFeedback(this.id);
    this.getAverageScore(this.id);
  }

  loadFeedback(id: number) {
    this.loading = true;
    this.feedbackService.getFeedbackById(id).subscribe({
      next: (data) => {
        console.log("success",data);
        this.feedback = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log("error",error);
        this.errorMsg = "Feedback introuvable.";
        this.loading = false;
      }
    });
  }

  getAverageScore(id: number) {
    this.feedbackService.getScoringFeedback(id).subscribe({
      next: res =>{
        this.averageScore = res;
        console.log(res);
        this.cdr.detectChanges();
      }
    })
  }

  back() {
    this.router.navigate(['/feedbacks']);
  }

}
