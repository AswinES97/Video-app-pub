import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, filter, finalize, of, switchMap, take, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpinterceptorInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false
  private refreshTokenSubject = new BehaviorSubject(null)

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private _router: Router,
    private toaster: ToastrService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(this.addToken(request)).pipe(
      catchError((requestError: HttpErrorResponse )=>{
        if (requestError && requestError.status === 401) {
          if(this.refreshTokenInProgress){
            return this.refreshTokenSubject.pipe(
              // filter((result) => result),
              take(1),
              switchMap(() => next.handle(this.addToken(request)))
            );
          }else{
            this.refreshTokenInProgress = true
            this.refreshTokenSubject.next(null)
            
            return this.authService.refreshAuthToken().pipe(
              switchMap((token: any)=>{
                localStorage.setItem('accessToken',token.accessToken as string)
                return next.handle(this.addToken(request))
              }),
              finalize(() => (this.refreshTokenInProgress = false))
            )
          }
          
        }
        // console.log(requestError)
        if(requestError && requestError.status === 400 && requestError.error.error[0].message === 'refresh token Expired'){
          return throwError(()=>{
            this.toaster.error('Your Session is Expired!')
            setTimeout(()=>{
              localStorage.removeItem('accessToken')
              this._router.navigate(['auth','login'])
            },2000)
            return requestError
          })
        }

        return throwError(()=>requestError)
      })
    )
  }

  addToken(request: HttpRequest<any>) {
    const token = this.tokenService.getToken()
    
    if(!token) return request

    return request.clone({
      setHeaders:{
        Authorization: `Bearer ${token}`
      }
    })
  }
}
