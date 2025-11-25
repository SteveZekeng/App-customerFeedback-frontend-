import {Component, OnInit} from '@angular/core';
import {Staff} from '../modele/staff.model';
import {ActivatedRoute, Router} from '@angular/router';
import {StaffService} from '../service/staff.service';

@Component({
  selector: 'app-staff-detail-component',
  imports: [
  ],
  templateUrl: './staff-detail-component.html',
  styleUrl: './staff-detail-component.scss',
})
export class StaffDetailComponent implements OnInit {

  staff!: Staff;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadStaff(id);
  }

  loadStaff(id: number) {
    this.staffService.getStaffById(id).subscribe(data => {
      this.staff = data;
    });
  }

  back() {
    this.router.navigate(['/staff']);
  }
}
