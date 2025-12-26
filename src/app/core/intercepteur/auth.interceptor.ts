import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, switchMap, catchError } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Exclure les endpoints d'auth pour éviter les boucles
    if (
      req.url.endsWith('/auth/login') ||
      req.url.endsWith('/auth/register') ||
      req.url.endsWith('/auth/refreshtoken')
    ) {
      return next.handle(req);
    }


    const token = this.authService.getToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 && this.authService.getRefreshToken()) {
          return this.authService.refreshToken().pipe(
            switchMap((res: any) => {
              // Mettre à jour le JWT dans le service
              this.authService.setToken(res.accessToken);

              // Refaire la requête originale avec le nouveau JWT
              const retryReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`
                }
              });
              return next.handle(retryReq);
            }),
            catchError((err) => {
              this.authService.logout();
              return throwError(() => err);
            })
          );
        }

        return throwError(() => error);
      })
    );
  }
}
