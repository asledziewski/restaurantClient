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
  selector: 'app-reservations-tab',
  templateUrl: './reservations-tab.component.html',
  styleUrls: ['./reservations-tab.component.css']
})
export class ReservationsTabComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  reservations: Reservation[] = [];
  displayedColumns = ['reservationId', 'rtableId', 'dateTime', 'Options'];
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

    this.loadCurrentReservations();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }


  private loadCurrentReservations() {
    this.reservationService.getCurrentReservations().pipe(first()).subscribe(reservations => {
      this.dataSource.data = reservations;
    });
  }

  private confirmReservation(reservationId: number) {
    this.reservationService.getReservationById(reservationId).pipe(first()).subscribe(res => {
        res.valueOf().status = 'CONFIRMED';
        this.reservationService.updateReservation(res.valueOf()).pipe(first()).subscribe(() => {
          this.loadCurrentReservations();
        });
      }
    );
  }
}

