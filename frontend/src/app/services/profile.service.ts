import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private _http: HttpClient) { }

  getUserProfile(){    
    return this._http.get(`${environment.apiURL}/profile/user/`, { withCredentials: true})
  }

  setUsername(username: string){    
    return this._http.patch(`${environment.apiURL}/profile/user/username/`,{username}, { withCredentials: true})
  }
  
}
