import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { EmailSentComponent } from './email-sent/email-sent.component';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    EmailSentComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  exports: [
    // SignupComponent,
    AuthRoutingModule,
    // EmailSentComponent
  ]
})
export class AuthModule { }
