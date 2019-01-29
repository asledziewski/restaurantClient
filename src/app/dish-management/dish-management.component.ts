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
  selector: 'app-dish-management',
  templateUrl: './dish-management.component.html',
  styleUrls: ['./dish-management.component.css']
})
export class DishManagementComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  displayedColumns = ['dishId', 'englishName', 'polishName', 'price', 'options'];
  dataSource = new MatTableDataSource<Dish>();
  dishForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private dishService: DishService,
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

    this.loadDishes();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dishForm = this.formBuilder.group({
      englishName: ['', Validators.required],
      polishName: ['', Validators.required],
      price: ['0.00', [Validators.required,  Validators.min(1)]]
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }


  private loadDishes() {
    this.dishService.getDishes().pipe(first()).subscribe(dishes => {
      this.dataSource.data = dishes;
    });
  }

  private deleteDish(id: number) {
    this.dishService.deleteDish(id).pipe(first()).subscribe( () => {
      this.loadDishes();
    }, e => this.alertService.error(e));
  }

  get f() { return this.dishForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.dishForm.invalid) {
      return;
    }

    this.loading = true;
    this.dishService.addDish(this.f.englishName.value, this.f.polishName.value, this.f.price.value)
      .pipe(first())
      .subscribe(
        () => {
          location.reload();
          this.loadDishes();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

