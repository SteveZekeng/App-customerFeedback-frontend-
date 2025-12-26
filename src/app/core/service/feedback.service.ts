import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Feedback} from '../../share/modele/feedback.model';
import {Observable} from 'rxjs';
import {Page} from '../../share/modele/page.model';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private baseUrl = 'http://localhost:8083/customFeedback/feedback';

  constructor(private http: HttpClient) {
  }

  createFeedback(fd: Feedback): Observable<Feedback>{
    return this.http.post<Feedback>(`${this.baseUrl}/addFeedback`, fd);
  }

  getAllFeedback(page: number, size: number): Observable<Page<Feedback>> {
    return this.http.get<Page<Feedback>>(
      `${this.baseUrl}?page=${page}&size=${size}`
    );
  }

  getFeedbackById(id:number): Observable<Feedback>{
    return this.http.get<Feedback>(`${this.baseUrl}/${id}`);
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
