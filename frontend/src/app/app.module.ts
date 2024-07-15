import { ErrorHandler, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';
import { StoreModule } from '@ngrx/store';

import { HomeModule } from './components/home/home.module';
import { WildcardComponent } from './components/wildcard/wildcard.component';
import { userReducer } from './components/ngrx/user.reducer';
import { EmailverificationComponent } from './components/emailverification/emailverification.component';
import { httpInterceptorProviders } from './interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './components/shared/shared.module';

@NgModule({
  declarations: [AppComponent, WildcardComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HomeModule,
    EmailverificationComponent,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 1500,
      progressBar: true,
      easing: 'ease-out',
      easeTime: 100,
      positionClass: 'toast-top-center',
    }),
    StoreModule.forRoot({ user: userReducer }, {}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: ErrorHandler, useClass: GlobalErrorHandlerService },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
