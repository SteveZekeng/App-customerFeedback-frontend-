import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Responses} from '../modele/responses.model';
import {ResponseService} from '../../core/service/responses.service';
import {finalize} from 'rxjs';
import {Feedback} from '../modele/feedback.model';

@Component({
  selector: 'app-responses-component',
  imports: [],
  templateUrl: './responses-component.html',
  styleUrl: './responses-component.scss',
})
export class ResponsesComponent implements OnInit {

  responses: Responses[] = [];
  loading = false;
  errorMsg = '';

  constructor(private responseService: ResponseService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.responseService.getAll().subscribe(r => this.responses = r);
    this.cdr.detectChanges();
  }

  loadResponses(): void {
    this.loading = true;
    this.responseService.getAll()
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges()
      }))
      .subscribe({
        next: data => { this.responses = data; },
        error: () => { this.errorMsg = 'Erreur lors du chargement.'; }
      });
  }


  delete(id: number) {
    if (confirm('Êtes-vous sûr ?')) {
      this.responseService.delete(id).subscribe(() =>
        this.loadResponses())
      console.log('Feedback supprimé avec succes')
    }
  }

  // viewDetail(id: number) {
  //   this.router.navigate(['/feedback', id]);
  // }
}
