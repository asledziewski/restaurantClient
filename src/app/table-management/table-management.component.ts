import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {User} from '@app/_models';
import {AlertService, AuthenticationService, ReservationService, UserService} from '@app/_services';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Table} from '@app/_models/table';
import {TableService} from '@app/_services/table.service';
import {BillService} from '@app/_services/bill.service';
import {Reservation} from '@app/_models/reservation';
import {Router} from '@angular/router';
import {Dish} from '@app/_models/dish';
import {DishService} from '@app/_services/dish.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-table-management',
  templateUrl: './table-management.component.html',
  styleUrls: ['./table-management.component.css']
})
export class TableManagementComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  displayedColumns = ['rtableId', 'number', 'size', 'Options'];
  dataSource = new MatTableDataSource<Table>();
  tableForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private tableService: TableService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {

    this.loadTables();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.tableForm = this.formBuilder.group({
      number: ['1', [Validators.required, Validators.min(1), Validators.pattern('[0-9]{1,}')]],
      size: ['1', [Validators.required, Validators.min(1), Validators.pattern('[0-9]{1,}')]]
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }


  private loadTables() {
    this.tableService.getTables().pipe(first()).subscribe(tables => {
      this.dataSource.data = tables;
    });
  }

  private deleteTable(id: number) {
    this.tableService.deleteTable(id).pipe(first()).subscribe( () => {
      this.loadTables();
    }, e => this.alertService.error(e));
  }

  get f() { return this.tableForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.tableForm.invalid) {
      return;
    }

    this.loading = true;
    this.tableService.addTable(this.f.number.value, this.f.size.value)
      .pipe(first())
      .subscribe(
        () => {
          location.reload();
          this.loadTables();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

