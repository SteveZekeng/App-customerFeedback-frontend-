import {Component} from '@angular/core';
import {Question} from '../modele/question.model';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QuestionService} from '../service/question.service';
import {InputType} from '../enum/input-type.enum';

@Component({
  selector: 'app-question-component',
  imports: [
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './question-component.html',
  styleUrl: './question-component.scss',
})
export class QuestionComponent {

  InputType = InputType;

  question: Question = {
    labelQuestion: '',
    inputType: InputType.TEXT,
    propositions: []
  };

  constructor(private questionService: QuestionService) {}

  onInputTypeChange() {
    const type = this.question.inputType;

    if (type === InputType.SELECT_OPT) {
      this.question.propositions = [
        { label: '', score: 0 },
        { label: '', score: 0 }
      ];
    }
    else if (type === InputType.RADIO_BUTTON) {
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
    this.questionService.createQuestion(this.question).subscribe({
      next: () => alert("Question créée avec succès !"),
      error: () => alert("Erreur lors de la création.")
    });
  }
}
