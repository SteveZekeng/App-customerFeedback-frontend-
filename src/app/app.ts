import { Component, signal } from '@angular/core';
import {NavbarComponent} from './navbar-component/navbar-component';
import {SidebarComponent} from './sidebar-component/sidebar-component';
import {FooterComponent} from './footer-component/footer-component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [NavbarComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
}
