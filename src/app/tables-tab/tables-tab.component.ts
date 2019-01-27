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

@Component({
  selector: 'app-tables-tab',
  templateUrl: './tables-tab.component.html',
  styleUrls: ['./tables-tab.component.css']
})
export class TablesTabComponent implements OnInit {
  currentUser: User;
  currentUserSubscription: Subscription;
  tables: Table[] = [];
  displayedColumns = ['rtableId', 'number', 'size', 'status', 'Options'];
  dataSource = new MatTableDataSource<Table>();

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
    this.loadAllTables();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  addBill(id: number) {
    this.billService.addBill(id).pipe(first()).subscribe(() => {
      this.loadAllTables();
    });
  }

  private billDetails(rtableId: number) {
    this.tableService.getCurrentBill(rtableId).pipe(first()).subscribe( bill => {
      this.router.navigate([`/bill/${bill.billId}`]);
    });
  }

  private loadAllTables() {
    this.tableService.getTables().pipe(first()).subscribe(tables => {
      this.dataSource.data = tables;
    });
  }
}

