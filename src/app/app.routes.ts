import { Routes } from '@angular/router';
import {AgenceComponent} from './agence-component/agence-component';
import {AgenceDetailComponent} from './agence-detail-component/agence-detail-component';
import {AgenceListDescComponent} from './agence-list-desc-component/agence-list-desc-component';
import {StaffComponent} from './staff-component/staff-component';
import {StaffDetailComponent} from './staff-detail-component/staff-detail-component';
import {StaffByagenceComponent} from './staff-byagence-component/staff-byagence-component';
import {QuestionComponent} from './question-component/question-component';
import {AuthGuard} from './guard/auth.guard';
import {LoginComponent} from './login-component/login-component';
import {AuthLayoutComponent} from './auth-layout-component/auth-layout-component';
import {MainLayoutComponent} from './main-layout-component/main-layout-component';

export const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'agences', component: AgenceComponent },
      { path: 'agence/:id', component: AgenceDetailComponent },
      { path: 'agences-desc', component: AgenceListDescComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'staff/:id', component: StaffDetailComponent },
      { path: 'staff-by-agence', component: StaffByagenceComponent },
      { path: 'questions', component: QuestionComponent },
    ]
  },
  {
    path: '', component: AuthLayoutComponent,
    children: [
      { path: 'auth', component: LoginComponent },
      { path: '', redirectTo: 'auth', pathMatch: 'full' }
    ]
  },
  {
    path: 'dashboard',
    component: StaffComponent,
    canActivate: [AuthGuard]
  }


];
