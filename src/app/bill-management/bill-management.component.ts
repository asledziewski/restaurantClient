import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {User} from '@app/_models';
import {AuthenticationService, ReservationService, UserService} from '@app/_services';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Table} from '@app/_models/table';
import {TableService} from '@app/_services/table.service';
import {BillService} from '@app/_services/bill.service';
import {Router} from '@angular/router';
import {Bill} from '@app/_models/bill';

@Component({
  selector: 'app-bill-management',
  templateUrl: './bill-management.component.html',
  styleUrls: ['./bill-management.component.css']
})
export class BillManagementComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  displayedColumns = ['billId', 'creationDate', 'status', 'value', 'Options'];
  dataSource = new MatTableDataSource<Bill>();

  constructor(
    private authenticationService: AuthenticationService,
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
    this.loadAllBills();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }


  private billDetails(id: number) {
      this.router.navigate([`/bill/${id}`]);
    }

  private loadAllBills() {
    this.billService.getBills().pipe(first()).subscribe(tables => {
      this.dataSource.data = tables;
    });
  }
}

