import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Agence} from '../modele/agence.model';
import {AgenceService} from '../../core/service/agence.service';

@Component({
  selector: 'app-agence-list-desc-component',
  imports: [],
  templateUrl: './agence-list-desc-component.html',
  styleUrl: './agence-list-desc-component.scss',
})
export class AgenceListDescComponent implements OnInit {

  agences: Agence[] = [];

  constructor(private agenceService: AgenceService,
              private cdr: ChangeDetectorRef,) {}

  ngOnInit(): void {
    this.loadAgencesDesc();
  }

  loadAgencesDesc() {
    this.agenceService.getListAgenceOrderDesc().subscribe(data => {
      console.log("success",data);
      this.agences = data;
      this.cdr.detectChanges();
    });
  }

}

