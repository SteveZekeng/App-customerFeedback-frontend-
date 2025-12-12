import { Component } from '@angular/core';
import {NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {AuthService} from '../../core/service/auth.service';

@Component({
  selector: 'app-navbar-component',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar-component.html',
  styleUrl: './navbar-component.scss',
})
export class NavbarComponent {

  constructor(private authService: AuthService) {}

  disconnected(){
    this.authService.logout();
  }

}
