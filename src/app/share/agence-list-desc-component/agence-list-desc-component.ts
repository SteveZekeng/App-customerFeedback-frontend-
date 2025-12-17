import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Agence} from '../modele/agence.model';
import {AgenceService} from '../../core/service/agence.service';
import {Router} from '@angular/router';
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

  constructor(private agenceService: AgenceService,
              private cdr: ChangeDetectorRef,
              private router: Router,) {}

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
  back() {
    this.router.navigate(['/agences']);
  }


}

