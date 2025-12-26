import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {finalize} from 'rxjs';
import {Feedback} from '../modele/feedback.model';
import {FeedbackService} from '../../core/service/feedback.service';

@Component({
  selector: 'app-feedback-component',
  imports: [],
  templateUrl: './feedback-component.html',
  styleUrl: './feedback-component.scss',
})
export class FeedbackComponent implements OnInit {
  feedbackList: Feedback[] = [];
  loading = false;
  errorMsg = '';
  currentPage: number = 0;
  totalPages: number = 0;
  itemsByPage: number = 10;
  totalItems: number = 0;
  pageSizeOptions: number[] = [5, 10, 20, 40, 60];


  constructor(
    private feedbackService: FeedbackService,
    private router: Router,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadFeedbacks();
  }

  loadFeedbacks(): void {
    this.loading = true;
    this.feedbackService.getAllFeedback(this.currentPage, this.itemsByPage)
      .pipe(finalize(() => {
        this.loading = false;
        this.cdr.detectChanges()
      }))
      .subscribe({
        next: data => {
          this.feedbackList = data.content;
          this.totalPages = data.totalPages;
          this.currentPage = data.pageable.pageNumber;
          this.totalItems = data.totalItems;
          },
        error: () => {
          this.errorMsg = 'Erreur lors du chargement.';
        }
      });
  }


  delete(id: number) {
    if (confirm('Voulez-vous vraiment supprimer ce feedback?')) {
      this.feedbackService.deleteFeedback(id).subscribe(() =>
        this.loadFeedbacks())
      console.log('Feedback supprimé avec succes')
    }
  }

  viewDetail(id: number) {
    this.router.navigate(['/feedback', id]);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadFeedbacks();
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadFeedbacks();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadFeedbacks();
    }
  }

  changePageSize(size: number): void {
    this.itemsByPage = size;
    this.currentPage = 0;
    this.loadFeedbacks();
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadFeedbacks();
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
