import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { VideoUploadModalComponent } from './video-upload-modal/video-upload-modal.component';

@NgModule({
  declarations: [
    NavbarComponent,
    VideoUploadModalComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    NavbarComponent,
    VideoUploadModalComponent
  ]
})
export class SharedModule { }
