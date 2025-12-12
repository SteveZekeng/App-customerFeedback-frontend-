import {ChangeDetectorRef, Component} from '@angular/core';
import {Responses} from '../modele/responses.model';
import {ResponseService} from '../../core/service/responses.service';

@Component({
  selector: 'app-responses-component',
  imports: [],
  templateUrl: './responses-component.html',
  styleUrl: './responses-component.scss',
})
export class ResponsesComponent {

  responses: Responses[] = [];
  loading = false;
  errorMsg = '';


  constructor(private responseService: ResponseService,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.responseService.getAll().subscribe(r => this.responses = r);
    this.cdr.detectChanges();
  }
}
