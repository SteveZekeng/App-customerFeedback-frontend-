import {Component, OnInit} from '@angular/core';
import {Agence} from '../modele/agence.model';
import {AgenceService} from '../service/agence.service';
import {DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-agence-list-desc-component',
  imports: [
    DecimalPipe
  ],
  templateUrl: './agence-list-desc-component.html',
  styleUrl: './agence-list-desc-component.scss',
})
export class AgenceListDescComponent implements OnInit {

  agences: Agence[] = [];

  constructor(private agenceService: AgenceService) {}

  ngOnInit(): void {
    this.loadAgencesDesc();
  }

  loadAgencesDesc() {
    this.agenceService.getListAgenceOrderDesc().subscribe(data => {
      this.agences = data;
    });
  }

}

