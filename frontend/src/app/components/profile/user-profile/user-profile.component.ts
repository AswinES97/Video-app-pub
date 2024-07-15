import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError } from 'rxjs';
import { ErrorHandlerService } from 'src/app/services/error-haandler.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  // private user$: Observable<object> 
  private userInfo!: {
    username: string,
    email: string,
    userId: string
  }
  
  profileForm!: FormGroup; 
  usernameBool = true
  emailBool = true
  phoneBool = true
  genderBool = true

  constructor(
    private profileSrv: ProfileService,
    private store: Store<{user:object}>,
    private formbuilder: FormBuilder,
    private errors: ErrorHandlerService,
    private toaster: ToastrService
  ){
    // this.user$ = this.store.select('user')
    // this.user$.subscribe((data: any)=>{
    //   this.userId = data.user.userId
    // })
    
  }

  ngOnInit(): void {
    this.profileForm = this.formbuilder.group({
      username:[{value: '', disabled: true},[Validators.required, Validators.minLength(5), Validators.maxLength(15)]],
      email:[{value: '', disabled: true},[Validators.required, Validators.email]],
      phone:[{value: '', disabled: true},[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender:[{value: '', disables: true},[Validators.required]]
    })
    this.getData()
  }

  getData(){    
    this.profileSrv.getUserProfile().subscribe((data:any)=>{
      this.userInfo = data
      this.profileForm.patchValue({
        username: data.username,
        email: data.email,
        phone: data.phone ? data.phone : '0000000000',
        gender: data.gender? data.gender: 'Select category'
      })
    })
  }

// enble editing
  editUsername(){
    this.phoneBool = true
    this.genderBool = true
    this.usernameBool = !this.usernameBool
    this.profileForm.get('username')?.enable()
  }

  editPhone(){
    this.usernameBool = true
    this.genderBool = true
    this.phoneBool = !this.phoneBool
    this.profileForm.get('phone')?.enable()
  }

  editGender(){
    this.usernameBool = true
    this.phoneBool = true
    this.genderBool = !this.genderBool
    this.profileForm.get('gender')?.enable()
  }
// save new  
  saveUsername(){
    if(!this.usernameValidation()){
      const updatedUserName = this.profileForm.get('username')
      // checks if username is same as previous
      if(this.userInfo.username === updatedUserName?.value){
        this.toaster.error('Username cannot be same as previous')
        return
      }
      // to disable save
      this.usernameBool = true
      updatedUserName?.disable()
      this.profileSrv.setUsername(this.profileForm.get('username')?.value)
      .pipe(
        catchError(err=> {
          this.usernameBool = false
          this.profileForm.get('username')?.enable()
          return this.errors.handleError(err,this.toaster)
        })
        )
      .subscribe(data=>{
        this.toaster.success('Username Updated')
        // console.log(data)
      })
    }
  }

  savePhone(){
    if(!this.phoneValidation()){
      this.phoneBool = true
      this.profileForm.get('phone')?.disable()
      console.log(this.profileForm.get('phone')?.value)
    }
  }

  saveGender() {
    if(!this.genderValidation()){

    }
  }

  // validating
  usernameValidation(){
    return this.profileForm.get('username')?.touched && this.profileForm.get('username')?.invalid 
  }

  emailValidation(){
    return this.profileForm.get('email')?.touched && this.profileForm.get('email')?.invalid
  }
  
  phoneValidation(){
    return this.profileForm.get('phone')?.touched && this.profileForm.get('phone')?.invalid
  }

  genderValidation(){
    return this.profileForm.get('gender')?.touched && this.profileForm.get('phone')?.invalid
  }

}
