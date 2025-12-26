import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {Staff} from '../modele/staff.model';
import {StaffService} from '../../core/service/staff.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DecimalPipe} from '@angular/common';
import {FeedbackService} from '../../core/service/feedback.service';


@Component({
  selector: 'app-staff-byagence-component',
  standalone: true,
  imports: [DecimalPipe, ReactiveFormsModule],
  templateUrl: './staff-byagence-component.html',
  styleUrls: ['./staff-byagence-component.scss'],
})
export class StaffByagenceComponent implements OnInit {

  staffList: Staff[] = [];
  loading = true;
  errorMsg = '';
  agenceLocation!: string;

  constructor(
    private staffService: StaffService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private feedbackService: FeedbackService,
  ) {}

  ngOnInit(): void {
    this.agenceLocation = String(this.route.snapshot.paramMap.get('agenceLocation'));
    this.loadStaff(this.agenceLocation);
  }

  loadStaff(agenceLocation: string) {
    this.loading = true;
    this.staffService.getListStaffByAgenceLocation(agenceLocation).subscribe({
      next: (data) => {
        console.log("success",data);
        this.staffList = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.log("error",error);
        this.errorMsg = "Staff introuvable.";
        this.loading = false;
      }
    });
  }

  back() {
    this.router.navigate(['/agences-desc']);
  }
}
