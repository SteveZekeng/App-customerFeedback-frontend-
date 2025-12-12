import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Question } from '../modele/question.model';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionService } from '../../core/service/question.service';
import { InputType } from '../enum/input-type.enum';
import { Router } from '@angular/router';
import {finalize} from 'rxjs';

@Component({
  selector: 'app-question-component',
  imports: [
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './question-component.html',
  styleUrl: './question-component.scss',
  standalone:true
})
export class QuestionComponent implements OnInit {

  InputType = InputType;

  question: Question = {
    labelQuestion: '',
    inputType: InputType.TEXT,
    propositions: []
  };

  questions: Question[] = [];
  editMode = false;
  selectedId: number | null = null;
  loading = false;
  errorMsg = '';

  constructor(private questionService: QuestionService,
              private cdr : ChangeDetectorRef) {}

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.questionService.getAllQuestion()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges()
      }))
        .subscribe({
      next: data => { this.questions = data; },
      error: () => { this.errorMsg = 'Erreur lors du chargement.';}
    });
  }

  onInputTypeChange() {
    const type = this.question.inputType;

    if (type === InputType.SELECT_OPT || type === InputType.RADIO_BUTTON) {
      this.question.propositions = [
        { label: '', score: 0 },
        { label: '', score: 0 }
      ];
    }
    else {
      this.question.propositions = [];
    }
  }

  addProposition() {
    if (!this.question.propositions) return;

    if (this.question.inputType === InputType.SELECT_OPT &&
      this.question.propositions.length < 4) {
      this.question.propositions.push({ label: '', score: 0 });
    }
  }

  removeProposition(index: number) {
    if (!this.question.propositions) return;

    if (this.question.propositions.length > 2) {
      this.question.propositions.splice(index, 1);
    }
  }

  submit() {
    if (this.editMode && this.selectedId !== null) {
      this.questionService.updateQuestion(this.selectedId, this.question).subscribe({
        next: () => {
          alert('Question mise à jour');
          this.resetForm();
          this.loadQuestions();
        },
        error: () => alert('Erreur lors de la mise à jour')
      });
    } else {

      this.questionService.createQuestion(this.question).subscribe({
        next: () => {
          alert('Question créée avec succès !');
          this.resetForm();
          this.loadQuestions();
        },
        error: () => alert('Erreur lors de la création.')
      });
    }
  }

  editQuestion(q: Question) {
    this.editMode = true;
    this.selectedId = q.id ?? null;
    this.question = {
      id: q.id,
      labelQuestion: q.labelQuestion,
      inputType: q.inputType,
      propositions: q.propositions ? q.propositions.map(p => ({...p})) : []
    };
  }

  deleteQuestion(id: number) {
    if (!confirm('Voulez-vous vraiment supprimer cette question ?')) return;
    this.questionService.deleteQuestion(id).subscribe({
      next: () => {
        alert('Question supprimée');
        this.loadQuestions();
      },
      error: () => alert('Erreur lors de la suppression')
    });
  }

  resetForm() {
    this.editMode = false;
    this.selectedId = null;
    this.question = {
      labelQuestion: '',
      inputType: InputType.TEXT,
      propositions: []
    };
  }
}
