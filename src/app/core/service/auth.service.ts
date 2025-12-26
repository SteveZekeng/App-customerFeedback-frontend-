import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private API_URL = 'http://localhost:8083/customFeedback/auth';
  private tokenKey = 'authToken';
  private refreshTokenKey = 'refreshToken';

  constructor(private http: HttpClient) {}

  login(creds: { username: string; password: string }): Observable<any> {

    //Nettoyage pour éviter les tokens invalides
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);

    return this.http.post<any>(`${this.API_URL}/login`, creds)
      .pipe(
        tap(res => {
          if (res?.token) {
            localStorage.setItem(this.tokenKey, res.token);
          }
          if (res?.refreshToken) {
            localStorage.setItem(this.refreshTokenKey, res.refreshToken);
          }
        })
      );
  }



  // Appel pour rafraîchir le JWT
  refreshToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    return this.http.post<any>(`${this.API_URL}/refreshtoken`, { refreshToken })
      .pipe(
        tap(res => {
          if (res.accessToken) {
            localStorage.setItem(this.tokenKey, res.accessToken);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }
}
