import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {DecimalPipe} from '@angular/common';
import {AgenceService} from '../../core/service/agence.service';
import {Router} from '@angular/router';
import {Staff} from '../modele/staff.model';
import {StaffService} from '../../core/service/staff.service';

@Component({
  selector: 'app-staff-list-desc-component',
  imports: [
    DecimalPipe
  ],
  templateUrl: './staff-list-desc-component.html',
  styleUrl: './staff-list-desc-component.scss',
})
export class StaffListDescComponent implements OnInit{

  staffs: Staff[] = [];

  constructor(private staffService: StaffService,
    private cdr: ChangeDetectorRef,
    private router: Router,) {}

  ngOnInit(): void {
    this.loadStaffsDesc();
  }

  loadStaffsDesc() {
    this.staffService.getListStaffOrderDesc().subscribe(data => {
      console.log("success",data);
      this.staffs = data;
      this.cdr.detectChanges();
    });
  }
  back() {
    this.router.navigate(['/staff']);
  }


}
