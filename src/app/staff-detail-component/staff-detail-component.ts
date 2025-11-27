import {Component, OnInit} from '@angular/core';
import {Staff} from '../modele/staff.model';
import {ActivatedRoute, Router} from '@angular/router';
import {StaffService} from '../service/staff.service';

@Component({
  selector: 'app-staff-detail-component',
  standalone: true,
  imports: [],
  templateUrl: './staff-detail-component.html',
  styleUrls: ['./staff-detail-component.scss'],
})
export class StaffDetailComponent implements OnInit {

  staff!: Staff | null;
  loading = true;
  errorMessage: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private staffService: StaffService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    if (!id) {
      this.errorMessage = "ID invalide.";
      this.loading = false;
      return;
    }

    this.loadStaff(id);
  }

  loadStaff(id: number) {
    this.loading = true;

    this.staffService.getStaffById(id).subscribe({
      next: (data) => {
        this.staff = data;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = "Aucun staff trouvé pour cet ID.";
        this.staff = null;
        this.loading = false;
      }
    });
  }

  back() {
    this.router.navigate(['/staff']);
  }
}
