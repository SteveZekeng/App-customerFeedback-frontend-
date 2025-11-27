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
  loading = false;
  errorMsg = '';
  selectedAgenceId: number | null = null;

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
    this.errorMsg = '';

    this.staffService.getAllStaffs().subscribe({
      next: data => {
        this.staffList = data;
        this.loading = false;
      },
      error: () => {
        this.errorMsg = 'Erreur lors du chargement des staffs.';
        this.loading = false;
      }
    });
  }

  loadStaffByAgence() {
    if (!this.selectedAgenceId) return;

    this.loading = true;
    this.errorMsg = '';

    this.staffService.getStaffByAgence(this.selectedAgenceId).subscribe({
      next: data => {
        this.staffList = data;
        this.loading = false;

        if (data.length === 0) {
          this.errorMsg = 'Aucun staff trouvé pour cette agence.';
        }
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

    if (this.editMode && this.selectedId !== null) {
      this.staffService.updateStaff(this.selectedId, staff).subscribe(() => {
        this.resetForm();
        this.loadStaffs();
      });
    } else {
      this.staffService.createStaff(staff).subscribe(() => {
        this.resetForm();
        this.loadStaffs();
      });
    }
  }

  edit(staff: Staff) {
    this.editMode = true;
    this.selectedId = staff.id || null;

    this.staffForm.patchValue(staff);
  }

  delete(id: number) {
    if (confirm("Êtes-vous sûr ?")) {
      this.staffService.deleteStaff(id).subscribe(() => {
        this.loadStaffs();
      });
    }
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

