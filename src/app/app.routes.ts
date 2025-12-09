import { Routes } from '@angular/router';
import {AgenceComponent} from './agence-component/agence-component';
import {AgenceDetailComponent} from './agence-detail-component/agence-detail-component';
import {AgenceListDescComponent} from './agence-list-desc-component/agence-list-desc-component';
import {StaffComponent} from './staff-component/staff-component';
import {StaffDetailComponent} from './staff-detail-component/staff-detail-component';
import {QuestionComponent} from './question-component/question-component';
import {AuthGuard} from './guard/auth.guard';
import {LoginComponent} from './login-component/login-component';
import {AuthLayoutComponent} from './auth-layout-component/auth-layout-component';
import {MainLayoutComponent} from './main-layout-component/main-layout-component';
import {FeedbackComponent} from './feedback-component/feedback-component';
import {NotFoundComponent} from './not-found-component/not-found-component';
import {FeedbackDetailComponent} from './feedback-detail-component/feedback-detail-component';
import {FeedbackFormComponent} from './feedback-form-component/feedback-form-component';
import {ValidedFormComponent} from './valided-form-component/valided-form-component';

export const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'agences', component: AgenceComponent },
      { path: 'agence/:id', component: AgenceDetailComponent },
      { path: 'agences-desc', component: AgenceListDescComponent },
      { path: 'staff', component: StaffComponent },
      { path: 'staff/:id', component: StaffDetailComponent },
      { path: 'questions', component: QuestionComponent },
      { path: 'feedbacks', component: FeedbackComponent },
      { path: 'feedback/:id', component: FeedbackDetailComponent },
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'auth', component: LoginComponent },
      { path: '', redirectTo: 'auth', pathMatch: 'full' }
    ]
  },
  { path: 'form/:matricule', component: FeedbackFormComponent },
  { path: 'validedForm', component: ValidedFormComponent },
  { path: 'dashboard', component: StaffComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },


];
