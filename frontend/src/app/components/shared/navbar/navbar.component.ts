import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IStoreUser, } from 'src/types/types';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  btnString!: string
  user!: Observable<IStoreUser>
  showUploadBtn!: boolean
  constructor(
    private store: Store<{user: IStoreUser}>,
    private router: Router,
    private modalService: ModalService
  ){}

  ngOnInit(): void {
    this.user = this.store.select('user')
    this.user.subscribe(data=>{
      // console.log(data);
      
      if(data?.user?.username === undefined){
        this.showUploadBtn = true
        if(this.router.url === '/auth/login'){
          this.btnString = 'Signup'
        }else{
          this.btnString = 'Login'
        }
      }else{
        this.showUploadBtn = false
        this.btnString = 'Upload'
      }
    })  
  }

  openModal(){
    this.modalService.updateState(true)
  }
}
