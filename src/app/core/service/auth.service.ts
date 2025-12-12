import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8083/customFeedback/auth';
  private tokenKey = 'authToken';

  constructor(private http: HttpClient) {}

  login(creds: { username: string; password: string }): Observable<any> {
    return this.http.post<{ 'jwt-token': string }>(`${this.API_URL}/login`, creds)
      .pipe(
        tap(res => {
          if (res['jwt-token']) {
            localStorage.setItem(this.tokenKey, res['jwt-token']);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
