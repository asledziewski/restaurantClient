import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '@app/_models';
import {Reservation} from '@app/_models/reservation';
import {Table} from '@app/_models/table';
import {Bill} from '@app/_models/bill';

@Injectable({providedIn: 'root'})
export class TableService {
  private tablesUrl = `${environment.apiUrl}/rTables`;
  constructor(private http: HttpClient) {
  }


  addTable(number: number, size: number) {
    return this.http.post<any>(this.tablesUrl, {number, size});
  }

  getTables() {
    return this.http.get<Table[]>(this.tablesUrl);
  }

  getCurrentBill(rtableId: number): Observable <Bill> {
    return this.http.get<Bill>(`${this.tablesUrl}/${rtableId}/currentBill`);
  }

  getTableById(id: number): Observable <Table> {
    return this.http.get<Table>(`${this.tablesUrl}/${id}`);
  }

  getTableReservations(rtableId: number): Observable <Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.apiUrl}/rTables/${rtableId}/reservations`);
  }

  getTableBills(rtableId: number): Observable <Bill[]> {
    return this.http.get<Bill[]>(`${environment.apiUrl}/rTables/${rtableId}/bills`);
  }

  deleteTable(id: number) {
    return this.http.delete(`${this.tablesUrl}/${id}`);
  }

  updateTable(table: Table) {
    return this.http.put(`${this.tablesUrl}/${table.rtableId}`, {table});
  }
}
