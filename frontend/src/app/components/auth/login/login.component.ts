import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, retry } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-haandler.service';
import { jwtDecode } from 'jwt-decode';
import { Store } from '@ngrx/store';
import { saveUser } from '../../ngrx/user.action';
import { userData, userStore } from 'src/types/types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isDisabled: boolean = false
  user$:Observable<object>

  constructor(
    private userStore: Store<{user:object}>,
    private formBuilder: FormBuilder, 
    private authService: AuthService,
    private toaster: ToastrService,
    private errorhandler: ErrorHandlerService,
    private router: Router
    ) { 
      this.user$ = userStore.select('user')
    }

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/)]]
  })

  getEmail(){
    return this.loginForm.get('email')
  }

  getPassword(){
    return this.loginForm.get('password')
  }

  mailErrorCondition(){
    return this.getEmail()?.touched && this.getEmail()?.invalid 
  }

  passwordErrorCondition(){
    return this.getPassword()?.touched && this.getPassword()?.invalid 
  }

  onSubmit() {
    if(this.loginForm.valid){      
      this.isDisabled = true
      this.authService.login(this.loginForm.value)
      .pipe(
        // retry(3),
        catchError(err=>{
          this.isDisabled = false
          return this.errorhandler.handleError(err,this.toaster)
        })
      )
      .subscribe(data=>{
        const response = data as responseData
        const payload:userStore = jwtDecode(response.accessToken)
        
        this.userStore.dispatch(saveUser({user: payload.data}))
        
        localStorage.setItem('accessToken', response.accessToken)
        this.router.navigate(['/'])
    })
    }else{
      this.isDisabled = false
      this.loginForm.markAllAsTouched()
      this.loginForm.markAsDirty()
    }
  }
}

type responseData = {
  accessToken: string
}
