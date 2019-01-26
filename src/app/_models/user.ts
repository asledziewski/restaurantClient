import {Reservation} from '@app/_models/reservation';
import {Role} from '@app/_models/role';

export class User {
  userId: number;
  mail: string;
  firstName: string;
  lastName: string;
  // password: string;
  roles: Role[];
  reservations: Reservation[];
  jwtToken: string;
}


