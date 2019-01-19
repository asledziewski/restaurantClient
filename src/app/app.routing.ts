import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home';
import {LoginComponent} from './login';
import {RegisterComponent} from './register';
import {AuthGuard} from './_guards';
import {MenuComponent} from '@app/menu/menu.component';
import {AboutComponent} from '@app/about/about.component';
import {ReservationComponent} from '@app/reservation/reservation.component';
import {ServiceComponent} from '@app/service/service.component';
import {ManagementComponent} from '@app/management/management.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'reservation', component: ReservationComponent},
  {path: 'service', component: ServiceComponent, canActivate: [AuthGuard]},
  {path: 'management', component: ManagementComponent},
  {path: '**', redirectTo: 'about', pathMatch: 'full'}
];
// canActivate: [AuthGuard]
export const routing = RouterModule.forRoot(appRoutes);
