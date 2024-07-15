import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ErrorHandlerService } from 'src/app/services/error-haandler.service';
import { catchError } from "rxjs"
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm : FormGroup
  submitted: boolean = false

  constructor(
    private formbuilder: FormBuilder, 
    private authService: AuthService,
    private errors: ErrorHandlerService,
    private toaster: ToastrService,
    private router: Router
    ){
    this.signupForm = this.formbuilder.group({
      username:['',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^*-]).{8,}$/)]],
      confirm_password:['',[Validators.required]]
    },{
      validators: [this.confirmPasswordValidator]
    }) 
  }
  

  confirmPasswordValidator (control: AbstractControl): ValidationErrors | null {      
      const password = control.get('password')
      const confirmPassword = control.get('confirm_password')

      if(password?.value === confirmPassword?.value) return null
      else {
        confirmPassword?.setErrors({'confirm_password': true})
        return { 'confirm_password': true }
      }

   }
  

  usernameValidation(){
    return this.signupForm.get('username')?.touched && this.signupForm.get('username')?.invalid 
  }

  emailValidation(){
    return this.signupForm.get('email')?.touched && this.signupForm.get('email')?.invalid
  }

  passwordValidation(){
    return this.signupForm.get('password')?.touched && this.signupForm.get('password')?.invalid
  }

  confirmPasswordValidation(){
    return this.signupForm.get('confirm_password')?.touched && this.signupForm.get('confirm_password')?.invalid
  }

  onSubmit(){
    if(this.signupForm.valid){
      this.submitted = true
      this.authService.signup(this.signupForm.value)
        .pipe(
          catchError(err=> {
            this.submitted = false
            return this.errors.handleError(err,this.toaster)}
            )
        )
        .subscribe(data =>{
          this.toaster.success('User Created')
          setTimeout(()=>{
            this.router.navigate(['/','email-sent'])
          },1000)
        })
    }else{
      this.submitted = false
      this.signupForm.markAllAsTouched()
      this.signupForm.markAsDirty()
    }
  }
}
