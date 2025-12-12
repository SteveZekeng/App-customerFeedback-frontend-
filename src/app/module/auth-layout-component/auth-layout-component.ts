import { Component } from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  templateUrl: './auth-layout-component.html',
  imports: [
    RouterOutlet
  ],
  styleUrls: ['./auth-layout-component.scss']
})
export class AuthLayoutComponent {

}
