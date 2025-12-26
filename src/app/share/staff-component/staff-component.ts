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
  loading = false;
  errorMsg = '';
  currentPage: number = 0;
  totalPages: number = 0;
  itemsByPage: number = 10;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 40, 60];

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
    this.staffService.getAllStaffs(this.currentPage, this.itemsByPage)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges()
      }))
      .subscribe({
      next: data => {
        this.staffList = data.content;
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
    if (confirm('Voulez-vous vraiment supprimer ce staff?')) {
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

  order(){
    this.router.navigate(['/staff-desc']);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadStaffs();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadStaffs();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadStaffs();
    }
  }

  changePageSize(size: number): void {
    this.itemsByPage = size;
    this.currentPage = 0;
    this.loadStaffs();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadStaffs();
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
