import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '@app/_models';
import {Reservation} from '@app/_models/reservation';
import {Bill} from '@app/_models/bill';
import {BillPosition} from '@app/_models/billPosition';
import {Dish} from '@app/_models/dish';

@Injectable({providedIn: 'root'})
export class BillPositionService {
  private billPositionsUrl = `${environment.apiUrl}/billPositions`;
  constructor(private http: HttpClient) {
  }


  addBillPosition(billId: number, dishId: Dish) {
    return this.http.post<any>(this.billPositionsUrl, {billId, dishId});
  }

  getBillPositionById(id: number): Observable <BillPosition> {
    return this.http.get<BillPosition>(`${this.billPositionsUrl}/${id}`);
  }

  deleteBillPosition(id: number) {
    return this.http.delete(`${this.billPositionsUrl}/${id}`);
  }

  updateBillPosition(billPosition: BillPosition) {
    return this.http.put(`${this.billPositionsUrl}/${billPosition.billPositionId}`, {billPosition});
  }
}
