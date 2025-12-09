import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputType} from '../enum/input-type.enum';
import {FooterComponent} from '../footer-component/footer-component';
import {FeedbackService} from '../service/feedback.service';
import {Feedback} from '../modele/feedback.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../modele/question.model';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-feedback-form-component',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    FooterComponent
  ],
  templateUrl: './feedback-form-component.html',
  styleUrl: './feedback-form-component.scss',
})
export class FeedbackFormComponent implements OnInit {

  feedback!: Feedback;
  questions: Question[] = [];
  errorMsg = '';
  matricule!:  string;

  constructor(private feedbackService: FeedbackService,
              private router: Router,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.matricule = String(this.route.snapshot.paramMap.get('matricule'));
    this.loadForm(this.matricule);
  }

  submit(){
    this.feedbackService.createFeedback(this.feedback).subscribe({
      next: () => {
        console.log('Staff crée avec succes ');
        this.valid();
      },
    });
  }

  valid() {
    this.router.navigate(['/validedForm']);
  }

  loadForm(matricule: string) {
    this.feedbackService.getFeedbackForm(matricule)
      .pipe(finalize(() => {
      this.cdr.detectChanges();
        console.log("succes", this.feedback.questions)
    })).subscribe({
      next: data => {this.feedback = data[0];},
      error: () => {this.errorMsg = "Erreur lors du chargement.";}
    });
  }

  protected readonly InputType = InputType;
}
