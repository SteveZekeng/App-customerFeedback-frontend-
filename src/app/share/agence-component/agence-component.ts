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
      this.agenceService.updateAgence(this.selectedId, this.newAgence).subscribe({
        next: () => {
          alert('Agence mise à jour');
        this.resetForm();
        this.loadAgences();
        },
        error: () => alert('Erreur lors de la mise à jour')
      });
    } else {
      this.agenceService.createAgence(this.newAgence).subscribe({
        next: (response) => {
          alert('Agence crée avec succès !');
          console.log('Agence créée avec succès !', response);
          this.loadAgences();
          this.resetForm();
        },
        error: (err) => {
          console.error(err);
          alert(this.errorMsg = 'Erreur lors de la création');
        }
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
