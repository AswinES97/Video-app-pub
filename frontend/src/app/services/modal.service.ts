import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private stateSource = new BehaviorSubject<boolean>(false);
  currentState = this.stateSource.asObservable()

  constructor(
  ) { }
  updateState(newState: boolean) { // Replace 'any' with your desired type
    this.stateSource.next(newState);
  }
}
