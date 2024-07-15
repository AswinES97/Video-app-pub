import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  user: Observable<object>
  constructor(
    private store: Store<{user: object}>
  ){
    this.user = this.store.select('user')
    this.user.subscribe(data=>console.log(data))
  }
}
