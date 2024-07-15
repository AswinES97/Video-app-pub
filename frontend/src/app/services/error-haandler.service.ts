import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {

  constructor(
    
  ) { }

  handleError(error: HttpErrorResponse, toster: ToastrService) {
    if(error.status.toString().startsWith('4'))
      toster.error(error.error.error[0].message)
    else
      toster.error('Something went Wrong')
    
    return throwError(() => new Error('Something bad happened; please try again later.')); 
  }
}
