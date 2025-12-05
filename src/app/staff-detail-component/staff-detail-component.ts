import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Staff} from '../modele/staff.model';
import {ActivatedRoute, Router} from '@angular/router';
import {StaffService} from '../service/staff.service';
import {FeedbackService} from '../service/feedback.service';

@Component({
  selector: 'app-staff-detail-component',
  standalone: true,
  imports: [],
  templateUrl: './staff-detail-component.html',
  styleUrls: ['./staff-detail-component.scss'],
})
export class StaffDetailComponent implements OnInit {

  staff!: Staff;
  loading = true;
  errorMsg = '';
  id!: number;
  averageScore!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService,
    private cdr: ChangeDetectorRef,
    private feedbackService: FeedbackService,
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.id);
    this.loadStaff(this.id);
    this.getAverageScore(this.id);
  }

  loadStaff(id: number) {
    this.loading = true;
    this.staffService.getStaffById(id).subscribe({
      next: (data) => {
        console.log("success",data);
        this.staff = data;
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

  getAverageScore(id: number) {
    this.feedbackService.getScoringStaff(id).subscribe({
      next: res =>{
        this.averageScore = res;
        console.log(res);
        this.cdr.detectChanges();
      }
    })
  }

  back() {
    this.router.navigate(['/staff']);
  }
}
