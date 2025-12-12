import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../../share/modele/question.model';

@Injectable({ providedIn: 'root' })
export class QuestionService {

  private baseUrl = 'http://localhost:8083/customFeedback/question';

  constructor(private http: HttpClient) {}

  createQuestion(question: Question): Observable<any> {
    return this.http.post(this.baseUrl, question);
  }

  getAllQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(this.baseUrl);
  }

  getQuestionById(id: number): Observable<Question> {
    return this.http.get<Question>(`${this.baseUrl}/${id}`);
  }

  updateQuestion(id: number, question: Question): Observable<Question> {
    return this.http.put<Question>(`${this.baseUrl}/${id}`, question);
  }

  deleteQuestion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
