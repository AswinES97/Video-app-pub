import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  getToken () {
    return localStorage.getItem('accessToken')
  }
}
