import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {environment} from '@environments/environment';
import {User} from '@app/_models';
import {Reservation} from '@app/_models/reservation';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({providedIn: 'root'})
export class ReservationService {
  private reservationsUrl = `${environment.apiUrl}/reservations`;
  constructor(private http: HttpClient) {
  }


  reserve(attendees: number, date: string, userId: number) {
    return this.http.post<any>(this.reservationsUrl, {attendees, date, userId});
  }

  getReservations(): Observable <Reservation[]> {
    return this.http.get<Reservation[]>(this.reservationsUrl);
  }

  getCurrentReservations(): Observable <Reservation[]> {
    return this.http.get<Reservation[]>(`${this.reservationsUrl}/current`);
  }

  getReservationById(id: number) {
    return this.http.get<any>(`${this.reservationsUrl}/${id}`);
  }

  getUserReservations(userId: number): Observable <Reservation[]> {
    return this.http.get<Reservation[]>(`${environment.apiUrl}/users/${userId}/reservations`);
  }

  deleteReservation(id: number) {
    return this.http.delete(`${this.reservationsUrl}/${id}`);
  }

  updateReservation(reservation: Reservation) {
    return this.http.put(`${this.reservationsUrl}/${reservation.reservationId}`, reservation );
  }
}
