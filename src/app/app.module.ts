import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// used to create fake backend
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from './_helpers';

import {AppComponent} from './app.component';
import {routing} from './app.routing';

import {AlertComponent} from './_components';
import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AboutComponent} from '@app/about/about.component';
import {MenuComponent} from '@app/menu/menu.component';
import {ReservationComponent} from '@app/reservation/reservation.component';
import {ServiceComponent} from '@app/service/service.component';
import {ManagementComponent} from '@app/management/management.component';
import {NavigationComponent} from '@app/navigation/navigation.component';

@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    AppComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    MenuComponent,
    ReservationComponent,
    ServiceComponent,
    ManagementComponent,
    NavigationComponent,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
