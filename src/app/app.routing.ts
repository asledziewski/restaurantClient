import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from '@app/home';
import {LoginComponent} from '@app/login';
import {RegisterComponent} from '@app/register';
import {AuthGuard} from '@app/_guards';
import {MenuComponent} from '@app/menu/menu.component';
import {AboutComponent} from '@app/about/about.component';
import {ReservationComponent} from '@app/reservation/reservation.component';
import {ServiceComponent} from '@app/service/service.component';
import {ManagementComponent} from '@app/management/management.component';
import {ServiceTableComponent} from '@app/service-table/service-table.component';
import {ServiceReservationComponent} from '@app/service-reservation/service-reservation.component';
import {UserManagementComponent} from '@app/user-management/user-management.component';
import {ReservationManagementComponent} from '@app/reservation-management/reservation-management.component';
import {BillManagementComponent} from '@app/bill-management/bill-management.component';
import {DishManagementComponent} from '@app/dish-management/dish-management.component';
import {TableManagementComponent} from '@app/table-management/table-management.component';
import {ProfileComponent} from '@app/profile/profile.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'reservation', component: ReservationComponent},
  // {path: 'service', component: ServiceComponent, canActivate: [AuthGuard]},
  {path: 'service/serviceTable', component: ServiceTableComponent},
  {path: 'service/serviceReservation', component: ServiceReservationComponent},
  // {path: 'management', component: ManagementComponent, canActivate: [AuthGuard]},
  {path: 'management/usersManagement', component: UserManagementComponent},
  {path: 'management/reservationsManagement', component: ReservationManagementComponent},
  {path: 'management/billsManagement', component: BillManagementComponent},
  {path: 'management/dishesManagement', component: DishManagementComponent},
  {path: 'management/tablesManagement', component: TableManagementComponent},
  {path: 'profile', component: ProfileComponent},
  {path: '**', redirectTo: 'about', pathMatch: 'full'}
];
// canActivate: [AuthGuard]
export const routing = RouterModule.forRoot(appRoutes);
