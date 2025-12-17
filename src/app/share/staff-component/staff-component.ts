import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Staff} from '../modele/staff.model';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {StaffService} from '../../core/service/staff.service';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';

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
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      staffName: ['', Validators.required],
      staffPhone: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      staffEmail: ['', [Validators.required, Validators.email]],
      matricule: ['', Validators.required],
      agence_id: ['', Validators.required]
    });

    this.loadStaffs();
  }

  loadStaffs() {
    this.loading = true;
    this.staffService.getAllStaffs()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges()
      }))
      .subscribe({
      next: data => { this.staffList = data; },
      error: () => { this.errorMsg = 'Erreur lors du chargement.'; }
    });
  }

  submit() {
    if (this.staffForm.invalid) return;

    const formValue = this.staffForm.value;

    const staff: any = {
      staffName: formValue.staffName,
      staffPhone: formValue.staffPhone,
      staffEmail: formValue.staffEmail,
      matricule: formValue.matricule,
      agence_id: {
        id: formValue.agence_id
      }
    };

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
        next: (response) => {
          alert('Staff crée avec succès !');
          console.log("success",response );
          this.resetForm();
          this.loadStaffs();
        },
        error: (err) => {
          console.error(err);
          alert(this.errorMsg = 'Erreur lors de la création');
        }
      });
    }
  }

  edit(staff: Staff) {
    this.editMode = true;
    this.selectedId = staff.id!;
    this.staffForm.patchValue(staff);
  }

  delete(id: number) {
    if (confirm('Êtes-vous sûr ?')) {
      this.staffService.deleteStaff(id).subscribe(() =>
        this.loadStaffs())
      console.log('Agence supprimée avec succes')
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
