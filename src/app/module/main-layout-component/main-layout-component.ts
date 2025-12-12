import { Component } from '@angular/core';
import {NavbarComponent} from '../../share/navbar-component/navbar-component';
import {SidebarComponent} from '../../share/sidebar-component/sidebar-component';
import {FooterComponent} from '../../share/footer-component/footer-component';
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
