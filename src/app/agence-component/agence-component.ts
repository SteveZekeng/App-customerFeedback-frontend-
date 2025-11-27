import { Component, OnInit } from '@angular/core';
import { Agence } from '../modele/agence.model';
import { AgenceService } from '../service/agence.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-agence-component',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './agence-component.html',
  styleUrls: ['./agence-component.scss'],
})
export class AgenceComponent implements OnInit {

  agences: Agence[] = [];
  newAgence: Agence = { agenceCity: '', agenceLocation: '' };
  editMode = false;
  selectedId: number | null = null;

  constructor(private agenceService: AgenceService, private router: Router) {}

  ngOnInit(): void {
    this.loadAgences();
  }

  loadAgences() {
    this.agenceService.getAllAgences().subscribe(data => this.agences = data);
  }

  submit() {
    if (!this.newAgence.agenceCity || !this.newAgence.agenceLocation) return;

    if (this.editMode && this.selectedId !== null) {
      this.agenceService.updateAgence(this.selectedId, this.newAgence).subscribe(() => {
        this.resetForm();
        this.loadAgences();
      });
    } else {
      this.agenceService.createAgence(this.newAgence).subscribe(() => {
        this.resetForm();
        this.loadAgences();
      });
    }
  }

  edit(ag: Agence) {
    this.editMode = true;
    this.selectedId = ag.id || null;
    this.newAgence = { ...ag };
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûr ?')) {
      this.agenceService.deleteAgence(id).subscribe(() => this.loadAgences());
    }
  }

  resetForm() {
    this.editMode = false;
    this.selectedId = null;
    this.newAgence = { agenceCity: '', agenceLocation: '' };
  }

  viewDetail(id: number) {
    this.router.navigate(['/agence', id]);
  }
}
