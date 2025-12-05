import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Feedback} from '../modele/feedback.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://localhost:8083/customFeedback/feedback';

  constructor(private http: HttpClient) {
  }

  createFeedback(fd:Feedback): Observable<string>{
    return this.http.post<string>(`${this.baseUrl}/addFeedback}`, fd);
  }

  getAllFeedback():Observable<Feedback[]>{
    return this.http.get<Feedback[]>(this.baseUrl);
  }

  getFeedbackById(id:number): Observable<Feedback>{
    return this.http.get<Feedback>(`${this.baseUrl}/${id}`);
  }

  updateFeedback(id:number, feedback:Feedback): Observable<Feedback>{
    return this.http.put<Feedback>(`${this.baseUrl}/${id}`, feedback);
  }

  deleteFeedback(id:number): Observable<void>{
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAllByStaffId(staffId:number): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.baseUrl}/feedbackStaff/${staffId}`);
  }

  getScoringStaff(staffId:number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/avgStaff/${staffId}`);
  }

  getScoringFeedback(feedbackId:number): Observable<number>{
    return this.http.get<number>(`${this.baseUrl}/scoring/${feedbackId}`);
  }

  getFeedbackForm(matricule:string): Observable<Feedback[]>{
    return this.http.get<Feedback[]>(`${this.baseUrl}/form/${matricule}`);
  }

}
