import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILogin, ISignup } from '../schemas/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _http: HttpClient) {}

  login(data: ILogin) {
    return this._http.post(
      `${environment.apiURL}/auth/user/signin/email`,
      data,
      { withCredentials: true }
    );
  }

  signup(data: ISignup) {
    return this._http.post(
      `${environment.apiURL}/auth/user/signup/email`,
      data
    );
  }

  verifyEmail(token: string) {
    return this._http.get(
      `${environment.apiURL}/auth/user/signup/email/${token}`
    );
  }

  refreshAuthToken() {
    return this._http.get(
      `${environment.apiURL}/auth/user/newAccessToken`,
      { withCredentials: true }
    );
  }
}
