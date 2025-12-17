import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {InputType} from '../enum/input-type.enum';
import {FooterComponent} from '../footer-component/footer-component';
import {FeedbackService} from '../../core/service/feedback.service';
import {Feedback} from '../modele/feedback.model';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../modele/question.model';
import {finalize} from 'rxjs';
import {Responses} from '../modele/responses.model';
import {ResponseService} from '../../core/service/responses.service';
import {Staff} from '../modele/staff.model';

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
  // responses: Responses[] = [];
  errorMsg = '';
  matricule!:  string;
  selectedId: number | null = null;
  isSubmitting = false;


  constructor(private feedbackService: FeedbackService,
              private router: Router,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.matricule = String(this.route.snapshot.paramMap.get('matricule'));
    this.loadForm(this.matricule);
  }

  loadForm(matricule: string) {
    this.feedbackService.getFeedbackForm(matricule)
      .pipe(finalize(() => {
      this.cdr.detectChanges();
        console.log("succes", this.feedback.questions, this.feedback.responses)
    })).subscribe({
      next: data => {
        this.feedback = data[0];

        this.feedback.responses = this.feedback.questions!.map(q => ({
          question_id: q.id!,
          value: 0,
          selectedLabel: '',
          feedback_id: 0
        }));
      }
    });
  }

  submit(form: any) {
    if (!form.valid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    // this.errorMsg = "Veuillez remplir tous les champs obligatoires.";


    this.feedbackService.createFeedback(this.feedback).subscribe({
      next: () => {
        console.log('Feedback créé avec succès');
        this.resetForm();
        this.router.navigate(['/validedForm']);
      },
      error: (err) => {
        console.log(err)
        this.errorMsg = "Erreur lors de l’envoi.";
        this.isSubmitting = false;
      }
    });
  }

  resetForm(){
    this.selectedId = null;
    this.feedback = {
      customerName: '',
      customerPhone: '',
      comment: '',
      responses: [],
      questions: []
    }
  }

  protected readonly InputType = InputType;
}
