import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
// used to create fake backend
import {ErrorInterceptor, JwtInterceptor} from './_helpers';

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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import { UserManagementComponent } from './user-management/user-management.component';
import { TableManagementComponent } from './table-management/table-management.component';
import { DishManagementComponent } from './dish-management/dish-management.component';
import { BillComponent } from './bill/bill.component';

import { ServiceTableComponent } from './service-table/service-table.component';
import { ServiceReservationComponent } from './service-reservation/service-reservation.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationManagementComponent } from './reservation-management/reservation-management.component';
import {BillManagementComponent} from '@app/bill-management/bill-management.component';
import {MatTableModule} from '@angular/material/table';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FooterComponent } from './footer/footer.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';
import { TablesTabComponent } from './tables-tab/tables-tab.component';
import { ReservationsTabComponent } from './reservations-tab/reservations-tab.component';
import { WeatherComponent } from './weather/weather.component';
@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ReactiveFormsModule,
    HttpClientModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
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
    UserManagementComponent,
    TableManagementComponent ,
    DishManagementComponent ,
    BillManagementComponent,
    BillComponent,
    ServiceReservationComponent,
    ServiceTableComponent,
    ProfileComponent,
    ReservationManagementComponent,
    FooterComponent,
    BillDetailsComponent,
    TablesTabComponent,
    ReservationsTabComponent ,
    WeatherComponent],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},

    // provider used to create fake backend
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
}
