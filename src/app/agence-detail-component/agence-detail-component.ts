import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AgenceService } from '../service/agence.service';
import { Agence } from '../modele/agence.model';
import {AsyncPipe, DecimalPipe} from '@angular/common';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-agence-detail',
  standalone: true,
  templateUrl: './agence-detail-component.html',
  styleUrls: ['./agence-detail-component.scss'],
  imports: []
})
export class AgenceDetailComponent implements OnInit {

  agence!: Agence;
  loading = true;
  errorMsg = '';
  id!: number;
  average!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private agenceService: AgenceService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.loadAgence(this.id);
    this.avgScore(this.id);
  }

  loadAgence(id: number) {
    this.agenceService.getAgenceById(id).subscribe({
      next: data => {
        console.log("success",data);
        this.agence = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log("error",error);
        this.errorMsg = "Agence introuvable.";
        this.loading = false;
      }
    });
  }
  avgScore(id: number) {
     this.agenceService.getAverageScore(id).subscribe({
      next: res =>{
        this.average = res;
        console.log(res);
        this.cdr.detectChanges();
      }
    })
  }

  back() {
    this.router.navigate(['/agences']);
  }

}
