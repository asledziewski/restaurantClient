import {Dish} from '@app/_models/dish';

export class BillPosition {
  billPositionId: number;
  billId: number;
  dishId: Dish;
}
