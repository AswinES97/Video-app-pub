import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler{

  handleError(error: any): void {
    console.log(error);
  }

  constructor() { }
}
