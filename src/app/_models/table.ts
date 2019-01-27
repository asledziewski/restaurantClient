import {Bill} from '@app/_models/bill';
import {Reservation} from '@app/_models/reservation';

export class Table {
  rtableId: number;
  number: number;
  size: number;
  status: string;
  bills: Bill[];
  reservations: Reservation[];
}
