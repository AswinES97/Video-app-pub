import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmailSentComponent } from './components/auth/email-sent/email-sent.component';
import { HomeComponent } from './components/home/home.component';
import { canActivate } from './authGuard/canActivate';
import { WildcardComponent } from './components/wildcard/wildcard.component';

const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'auth',
  loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule),
  canActivate: [canActivate]
}, {
  path: 'profile',
  loadChildren: () => import('./components/profile/profile.module').then(m => m.ProfileModule),
  // canActivate: [canActivate]
}, {
  path: 'email-sent',
  component: EmailSentComponent,
  canActivate: [canActivate]
}, {
  path: 'email-verification/:token',
  loadComponent: () => import('./components/emailverification/emailverification.component').then((m) => m.EmailverificationComponent),
  // canActivate: [canActivate]
}, {
  path: '**',
  component: WildcardComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
