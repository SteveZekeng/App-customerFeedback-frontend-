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
  currentPage: number = 0;
  totalPages: number = 0;
  itemsByPage: number = 10;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 40, 60];

  constructor(private agenceService: AgenceService,
              private router: Router,
              private cdr : ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAgences();
  }

  loadAgences() {
    this.loading = true;
    this.agenceService.getAllAgences(this.currentPage, this.itemsByPage)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }))
      .subscribe({
        next: data => {
          this.agences = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = data.pageable.pageNumber;
          this.totalItems = data.totalItems;
          },
        error: () => {
          this.errorMsg = 'Erreur lors du chargement.';
        }
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
    if (confirm('Voulez-vous vraiment supprimer cette agence?')) {
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

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadAgences();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadAgences();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadAgences();
    }
  }

  changePageSize(size: number): void {
    this.itemsByPage = size;
    this.currentPage = 0;
    this.loadAgences();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadAgences();
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, index) => index);
  }

  getVisiblePages(): number[] {
    const delta = 2; // Nombre de pages a montrer sur toutes les pages courantes

    let start = Math.max(1, this.currentPage - delta);
    let end = Math.min(this.totalPages, this.currentPage + delta);

    // Ensure we always show at least 5 pages if available
    if (end - start < 4) {
      if (start === 1) {
        end = Math.min(this.totalPages, start + 4);
      } else if (end === this.totalPages) {
        start = Math.max(1, end - 4);
      }
    }

    const pages = [];
    for (let i = start - 1; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  }
}
