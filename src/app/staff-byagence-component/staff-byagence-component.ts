import {Component, OnInit} from '@angular/core';
import {Agence} from '../modele/agence.model';
import {Staff} from '../modele/staff.model';
import {StaffService} from '../service/staff.service';
import {AgenceService} from '../service/agence.service';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-staff-byagence-component',
  imports: [
    FormsModule,
  ],
  templateUrl: './staff-byagence-component.html',
  styleUrl: './staff-byagence-component.scss',
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

    this.staffService.getStaffByAgence(this.selectedAgenceId).subscribe(data => {
      this.staffList = data;
      this.loading = false;
    });
  }

  viewDetail(id: number) {
    this.router.navigate(['/staff', id]);
  }

}
