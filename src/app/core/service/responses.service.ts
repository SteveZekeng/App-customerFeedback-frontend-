import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Responses } from '../../share/modele/responses.model';

@Injectable({
  providedIn: 'root'
})
export class ResponseService {

  private baseUrl = 'http://localhost:8083/customFeedback/response';

  constructor(private http: HttpClient) {}

  createResponse(response: Responses[]) :Observable<any>{
    return this.http.post<Response>(this.baseUrl, response);
  }

  getAll(): Observable<Responses[]> {
    return this.http.get<Responses[]>(`${this.baseUrl}`);
  }

  getById(id: number): Observable<Responses> {
    return this.http.get<Responses>(`${this.baseUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getByFeedbackId(feedbackId: number): Observable<Responses[]> {
    return this.http.get<Responses[]>(`${this.baseUrl}/responseFeedback/${feedbackId}`);
  }
}
