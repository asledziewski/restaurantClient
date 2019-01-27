import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '@app/_models';
import {Reservation} from '@app/_models/reservation';
import {Bill} from '@app/_models/bill';
import {BillPosition} from '@app/_models/billPosition';

@Injectable({providedIn: 'root'})
export class BillService {
  private billsUrl = `${environment.apiUrl}/bills`;
  constructor(private http: HttpClient) {
  }


  addBill(rtableId: number) {
    return this.http.post(this.billsUrl, {rtableId});
  }

  getBills() {
    return this.http.get<Bill[]>(this.billsUrl);
  }


  getBillById(id: number): Observable <Bill> {
    return this.http.get<Bill>(`${this.billsUrl}/${id}`);
  }

  getBillPositions(id: number): Observable <BillPosition[]> {
    return this.http.get<BillPosition[]>(`${this.billsUrl}/${id}/billPositions`);
  }

  getTableBills(rtableId: number): Observable <Bill[]> {
    return this.http.get<Bill[]>(`${environment.apiUrl}/rTables/${rtableId}/bills`);
  }

  deleteBill(id: number) {
    return this.http.delete(`${this.billsUrl}/${id}`);
  }

  updateBill(bill: Bill) {
    return this.http.put(`${this.billsUrl}/${bill.billId}`, bill);
  }
}
