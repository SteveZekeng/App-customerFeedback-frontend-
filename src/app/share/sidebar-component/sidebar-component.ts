import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-sidebar-component',
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar-component.html',
  styleUrl: './sidebar-component.scss',
})
export class SidebarComponent {
  collapsed = false;
  toggle() { this.collapsed = !this.collapsed; }

}
