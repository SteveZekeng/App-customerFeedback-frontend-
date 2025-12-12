import { Routes } from '@angular/router';
import {AgenceComponent} from './share/agence-component/agence-component';
import {AgenceDetailComponent} from './share/agence-detail-component/agence-detail-component';
import {AgenceListDescComponent} from './share/agence-list-desc-component/agence-list-desc-component';
import {StaffComponent} from './share/staff-component/staff-component';
import {StaffDetailComponent} from './share/staff-detail-component/staff-detail-component';
import {QuestionComponent} from './share/question-component/question-component';
import {AuthGuard} from './core/guard/auth.guard';
import {LoginComponent} from './share/login-component/login-component';
import {AuthLayoutComponent} from './module/auth-layout-component/auth-layout-component';
import {MainLayoutComponent} from './module/main-layout-component/main-layout-component';
import {FeedbackComponent} from './share/feedback-component/feedback-component';
import {NotFoundComponent} from './share/not-found-component/not-found-component';
import {FeedbackDetailComponent} from './share/feedback-detail-component/feedback-detail-component';
import {FeedbackFormComponent} from './share/feedback-form-component/feedback-form-component';
import {ValidedFormComponent} from './share/valided-form-component/valided-form-component';

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
      { path: 'feedback/:id', component: FeedbackDetailComponent }
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

  { path: 'validedForm', component: ValidedFormComponent },
  { path: 'form/:matricule', component: FeedbackFormComponent },

  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },


];
