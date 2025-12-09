import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-not-found-component',
  imports: [],
  templateUrl: './not-found-component.html',
  styleUrl: './not-found-component.scss',
})
export class NotFoundComponent {

  constructor(private router: Router) {
  }
  goToDashboard() {
    this.router.navigate(['/feedbacks']);
  }

}
