import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenceService } from '../service/agence.service';
import { Agence } from '../modele/agence.model';
import {DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-agence-detail',
  standalone: true,
  templateUrl: './agence-detail-component.html',
  styleUrls: ['./agence-detail-component.scss'],
  imports: [
    DecimalPipe
  ]
})
export class AgenceDetailComponent implements OnInit {

  agence!: Agence;
  loading = true;
  errorMsg = '';
  id!: number;
  average!: Observable<number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agenceService: AgenceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAgence(id);
    this.avgScore(id);
  }

  loadAgence(id: number) {
    this.loading = true;

    this.agenceService.getAgenceById(id).subscribe({
      next: data => {
        this.agence = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = "Agence introuvable.";
        this.loading = false;
      }
    });
  }
  avgScore(agenceId: number){
    this.average = this.agenceService.getAverageScore(this.id);
  }

  back() {
    this.router.navigate(['/agences']);
  }

}
