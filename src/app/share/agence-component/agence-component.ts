import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { Agence } from '../modele/agence.model';
import { AgenceService } from '../../core/service/agence.service';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms';
import {finalize} from 'rxjs';

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
  newAgence: Agence = { agenceMatriculate:'', agenceCity: '', agenceLocation: '' };
  editMode = false;
  selectedId: number | null = null;
  loading = false;
  errorMsg = '';

  constructor(private agenceService: AgenceService,
              private router: Router,
              private cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAgences();
  }

  loadAgences() {
    this.loading = true;
    this.agenceService.getAllAgences()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: data => { this.agences = data; },
        error: () => { this.errorMsg = 'Erreur lors du chargement.'; }
    });
  }

  submit() {
    const { agenceMatriculate, agenceCity, agenceLocation } = this.newAgence;

    if (!agenceMatriculate || !agenceCity || !agenceLocation) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    if (this.editMode && this.selectedId !== null) {
      this.agenceService.updateAgence(this.selectedId, this.newAgence).subscribe((response) => {
        this.resetForm();
        this.loadAgences();
        console.log('Agence mise à jour', response);
      });
    } else {
      this.agenceService.createAgence(this.newAgence).subscribe((response) => {
        this.loadAgences();
        this.resetForm();
          console.log('Agence créée avec succès !', response);

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
      this.agenceService.deleteAgence(id).subscribe(() =>
        this.loadAgences())
      console.log('Agence supprimée avec succes')
    }
  }

  resetForm() {
    this.editMode = false;
    this.selectedId = null;
    this.newAgence = { agenceMatriculate:'', agenceCity: '', agenceLocation: '' };
  }

  viewDetail(id: number) {
    this.router.navigate(['/agence', id]);
  }

  order(){
    this.router.navigate(['/agences-desc']);
  }
}
