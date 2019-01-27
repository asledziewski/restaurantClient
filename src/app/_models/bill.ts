import {BillPosition} from '@app/_models/billPosition';

export class Bill {
  billId: number;
  rtableId: number;
  status: string;
  billPositions: BillPosition[];
  value: number;
}
