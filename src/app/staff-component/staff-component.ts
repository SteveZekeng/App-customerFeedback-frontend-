import {Component, OnInit} from '@angular/core';
import {Staff} from '../modele/staff.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {StaffService} from '../service/staff.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-staff-component',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './staff-component.html',
  styleUrls: ['./staff-component.scss'],
})

export class StaffComponent implements OnInit {

  staffList: Staff[] = [];
  staffForm!: FormGroup;

  editMode = false;
  selectedId: number | null = null;

  selectedAgenceId: number | null = null;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private staffService: StaffService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      staffName: ['', Validators.required],
      staffPhone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      staffEmail: ['', [Validators.required, Validators.email]],
      matricule: ['', Validators.required],
      agenceId: ['', Validators.required]
    });

    this.loadStaffs();
  }

  loadStaffs() {
    this.loading = true;

    this.staffService.getAllStaffs().subscribe({
      next: data => { this.staffList = data; this.loading = false; },
      error: () => { this.errorMsg = 'Erreur lors du chargement.'; this.loading = false; }
    });
  }

  loadStaffByAgence() {
    if (!this.selectedAgenceId) return;

    this.loading = true;
    this.staffService.getStaffByAgence(this.selectedAgenceId).subscribe({
      next: data => {
        this.staffList = data;
        this.loading = false;
        if (data.length === 0) this.errorMsg = 'Aucun staff trouvé.';
      },
      error: () => {
        this.errorMsg = 'Agence introuvable.';
        this.loading = false;
      }
    });
  }

  submit() {
    if (this.staffForm.invalid) return;

    const staff: Staff = this.staffForm.value;

    if (this.editMode && this.selectedId) {
      this.staffService.updateStaff(this.selectedId, staff).subscribe({
        next: () => {
          alert('Staff mise à jour');
        this.resetForm();
        this.loadStaffs();
        },
        error: () => alert('Erreur lors de la mise à jour')
      });
    } else {
      this.staffService.createStaff(staff).subscribe({
        next: () => {
          alert('Staff crée avec succès !');
          this.resetForm();
          this.loadStaffs();
        },
        error: () => alert('Erreur lors de la création.')
      });
    }
  }

  edit(staff: Staff) {
    this.editMode = true;
    this.selectedId = staff.id!;
    this.staffForm.patchValue(staff);
  }

  delete(id: number) {
    if (confirm("Voulez-vous vraiment supprimer ce staff ?")) return;
    this.staffService.deleteStaff(id).subscribe({
      next: () => {
        alert('Staff supprimée');
        this.loadStaffs();
      },
      error: () => alert('Erreur lors de la suppression')
    });

  }

  resetForm() {
    this.editMode = false;
    this.selectedId = null;
    this.staffForm.reset();
  }

  viewDetail(id: number) {
    this.router.navigate(['/staff', id]);
  }
}
