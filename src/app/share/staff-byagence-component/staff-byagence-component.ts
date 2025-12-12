import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Agence} from '../modele/agence.model';
import {Staff} from '../modele/staff.model';
import {StaffService} from '../../core/service/staff.service';
import {AgenceService} from '../../core/service/agence.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-staff-byagence-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './staff-byagence-component.html',
  styleUrls: ['./staff-byagence-component.scss'],
})
export class StaffByagenceComponent implements OnInit {

  agences: Agence[] = [];
  selectedAgenceId: number | null = null;

  staffList: Staff[] = [];
  loading = false;

  constructor(
    private staffService: StaffService,
    private agenceService: AgenceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadAgences();
  }

  loadAgences() {
    this.agenceService.getAllAgences().subscribe(data => {
      this.agences = data;
    });
  }

  loadStaffByAgence() {
    if (!this.selectedAgenceId) return;

    this.loading = true;
    this.staffList = [];

    this.staffService.getStaffByAgence(this.selectedAgenceId).subscribe({
      next: (data) => {
        this.staffList = data;
        this.loading = false;
      },
      error: () => {
        this.staffList = [];
        this.loading = false;
      }
    });
  }

  viewDetail(id: number) {
    this.router.navigate(['/staff', id]);
  }
}
