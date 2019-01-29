import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {User} from '@app/_models';
import {AuthenticationService, ReservationService, UserService} from '@app/_services';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Table} from '@app/_models/table';
import {TableService} from '@app/_services/table.service';
import {BillService} from '@app/_services/bill.service';
import {Reservation} from '@app/_models/reservation';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  reservations: Reservation[] = [];
  displayedColumns = ['rTableNumber', 'date', 'Options'];
  dataSource = new MatTableDataSource<Reservation>();

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private tableService: TableService,
    private billService: BillService,
    private reservationService: ReservationService,
    private router: Router
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    this.loadUserReservations();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }


  private loadUserReservations() {
    this.reservationService.getUserReservations(this.currentUser.userId).pipe(first()).subscribe(reservations => {
      this.dataSource.data = reservations;
    });
  }

  private cancelReservation(reservationId: number) {
    this.reservationService.deleteReservation(reservationId).pipe(first()).subscribe(() => {
        this.loadUserReservations(); });
      }
}

