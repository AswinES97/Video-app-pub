import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { SharedModule } from '../shared/shared.module';


@Component({
  selector: 'app-emailverification',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule
  ],
  templateUrl: './emailverification.component.html',
  styleUrls: ['./emailverification.component.css']
})
export class EmailverificationComponent implements OnInit {
  public success$!: boolean
  public errorMsg: string ='' 
   constructor( 
    private route: ActivatedRoute,
    private router: Router,
    private _authService: AuthService,
   ){}

   ngOnInit(): void {
     this.route.paramMap.subscribe(paramsMap=>{
      const verificationToken$ = paramsMap.get('token')
      
      this._authService.verifyEmail(verificationToken$ as string).pipe(
        catchError(err=>{
          this.errorMsg = err.error.error[0].message
          
          this.success$ = false
          return throwError(()=>err)
        })
      )
      .subscribe(data=>{
        this.success$ = true
        setTimeout(()=>{
          this.router.navigate(['/auth/login'])
        },
        2500)
      })
    })
  }
}
