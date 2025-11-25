import {Component, inject} from '@angular/core';
import {AgenceService} from '../service/agence.service';
import {AgenceComponent} from '../agence-component/agence-component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-agence-list-component',
  imports: [
    AgenceComponent,
    AsyncPipe
  ],
  templateUrl: './agence-list-component.html',
  styleUrl: './agence-list-component.scss',
})
export class AgenceListComponent {

  private agenceService = inject(AgenceService);
  agences = this.agenceService.getAllAgences();

}
