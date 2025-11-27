import { Component } from '@angular/core';
import {NavbarComponent} from '../navbar-component/navbar-component';
import {SidebarComponent} from '../sidebar-component/sidebar-component';
import {FooterComponent} from '../footer-component/footer-component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [NavbarComponent, SidebarComponent, FooterComponent, RouterOutlet],
  templateUrl: './main-layout-component.html',
  styleUrls: ['./main-layout-component.scss']
})
export class MainLayoutComponent {

}
