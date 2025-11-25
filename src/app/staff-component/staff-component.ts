import {Component, OnInit} from '@angular/core';
import {Staff} from '../modele/staff.model';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {StaffService} from '../service/staff.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-staff-component',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './staff-component.html',
  styleUrl: './staff-component.scss',
})
export class StaffComponent implements OnInit {

  staffList: Staff[] = [];
  staffForm!: FormGroup;
  editMode = false;
  selectedId: number | null = null;

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
      agence_id: ['', Validators.required]
    });

    this.loadStaffs();
  }

  loadStaffs() {
    this.staffService.getAllStaffs().subscribe(data => {
      this.staffList = data;
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

