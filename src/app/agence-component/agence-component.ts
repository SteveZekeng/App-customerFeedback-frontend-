import {Component, Input, OnInit} from '@angular/core';
import {Agence} from '../modele/agence.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AgenceService} from '../service/agence.service';
import {DecimalPipe} from '@angular/common';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-agence-component',
  imports: [
    ReactiveFormsModule,
    DecimalPipe
  ],
  templateUrl: './agence-component.html',
  styleUrl: './agence-component.scss',
})
export class AgenceComponent implements OnInit {

  agences: Agence[] = [];
  agenceForm!: FormGroup;
  editMode = false;
  selectedId: number | null = null;
  @Input() agc!: Agence;

  constructor(
    private fb: FormBuilder,
    private agenceService: AgenceService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.agenceForm = this.fb.group({
      agenceCity: ['', Validators.required],
      agenceLocation: ['', Validators.required]
    });

    this.loadAgences();
  }

  loadAgences() {
    this.agenceService.getAllAgences().subscribe(data => {
      this.agences = data;
    });
  }

  submit() {
    if (this.agenceForm.invalid) return;

    const agence: Agence = this.agenceForm.value;

    if (this.editMode && this.selectedId !== null) {
      this.agenceService.updateAgence(this.selectedId, agence).subscribe(() => {
        this.resetForm();
        this.loadAgences();
      });
    } else {
      this.agenceService.createAgence(agence).subscribe(() => {
        this.resetForm();
        this.loadAgences();
      });
    }
  }

  edit(agence: Agence) {
    this.editMode = true;
    this.selectedId = agence.id || null;

    this.agenceForm.patchValue({
      agenceCity: agence.agenceCity,
      agenceLocation: agence.agenceLocation
    });
  }

  delete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ?')) {
      this.agenceService.deleteAgence(id).subscribe(() => {
        this.loadAgences();
      });
    }
  }

  resetForm() {
    this.editMode = false;
    this.selectedId = null;
    this.agenceForm.reset();
  }

  getAverage(id: number): void {
    this.agenceService.getAverageScore(id).subscribe(avg => {
      alert('Average score: ' + avg);
    });
  }

  viewDetail(id: number) {
    this.router.navigate(['/agence', id]);
  }
}
