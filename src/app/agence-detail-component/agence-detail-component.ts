import {Component, OnInit} from '@angular/core';
import {Agence} from '../modele/agence.model';
import {ActivatedRoute, Router} from '@angular/router';
import {AgenceService} from '../service/agence.service';
import {DecimalPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-agence-detail-component',
  imports: [
    DecimalPipe
  ],
  templateUrl: './agence-detail-component.html',
  styleUrl: './agence-detail-component.scss',
})
export class AgenceDetailComponent implements OnInit {

  agence!: Agence;
  average?: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agenceService: AgenceService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadAgence(id);
    this.loadAverage(id);
  }

  loadAgence(id: number) {
    this.agenceService.getAgenceById(id).subscribe(data => {
      this.agence = data;
    });
  }

  loadAverage(id: number) {
    this.agenceService.getAverageScore(id).subscribe(avg => {
      this.average = avg;
    });
  }

  back() {
    this.router.navigate(['/agences']);
  }
}
