import { Routes } from '@angular/router';
import {AgenceListComponent} from './agence-list-component/agence-list-component';
import {AgenceComponent} from './agence-component/agence-component';
import {AgenceDetailComponent} from './agence-detail-component/agence-detail-component';
import {AgenceListDescComponent} from './agence-list-desc-component/agence-list-desc-component';
import {StaffComponent} from './staff-component/staff-component';
import {StaffDetailComponent} from './staff-detail-component/staff-detail-component';
import {StaffByagenceComponent} from './staff-byagence-component/staff-byagence-component';

export const routes: Routes = [

  { path: 'agences', component: AgenceComponent },
  { path: 'agence-list', component: AgenceListComponent },
  { path: 'agence/:id', component: AgenceDetailComponent },
  { path: 'agences-desc', component: AgenceListDescComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'staff/:id', component: StaffDetailComponent },
  { path: 'staff-by-agence', component: StaffByagenceComponent }

];
