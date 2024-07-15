import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { saveUser } from './components/ngrx/user.action';
import { jwtDecode } from 'jwt-decode';
import { userStore } from 'src/types/types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  user$: Observable<object>
  constructor(
    private store: Store<{user: object}>
  ){
    this.user$ = store.select('user')
  }

  ngOnInit(): void {
    // initFlowbite();
    const token = localStorage.getItem('accessToken')
    if(token){
      const payload:userStore = jwtDecode(token)
      this.store.dispatch(saveUser({user: payload.data}))
    }
  }

}
