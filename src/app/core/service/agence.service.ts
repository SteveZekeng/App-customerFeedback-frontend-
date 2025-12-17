import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agence } from '../../share/modele/agence.model';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {

  private baseUrl = 'http://localhost:8083/customFeedback/agence';

  constructor(private http: HttpClient) { }

  createAgence(agence: Agence): Observable<Agence> {
    return this.http.post<Agence>(`${this.baseUrl}`, agence);
  }

  getAllAgences(): Observable<Agence[]> {
    return this.http.get<Agence[]>(`${this.baseUrl}`);
  }

  getAgenceById(id: number): Observable<Agence> {
    return this.http.get<Agence>(`${this.baseUrl}/${id}`);
  }

  updateAgence(id: number, agence: Agence): Observable<Agence> {
    return this.http.put<Agence>(`${this.baseUrl}/${id}`, agence);
  }

  deleteAgence(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  getAverageScore(agenceId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/avgAgence/${agenceId}`);
  }

  getListAgenceOrderDesc(): Observable<Agence[]> {
    return this.http.get<Agence[]>(`${this.baseUrl}/listAgenceOrderDesc`);
  }
}
