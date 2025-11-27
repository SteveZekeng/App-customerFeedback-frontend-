import { Component, signal } from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {AuthInterceptor} from './intercepteur/auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
