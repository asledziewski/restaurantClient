import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {first} from 'rxjs/operators';

import {User} from '@app/_models';
import {AlertService, AuthenticationService, UserService} from '@app/_services';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit, OnDestroy {
  currentUser: User;
  currentUserSubscription: Subscription;
  roles: String[] = ['USER', 'WORKER', 'ADMIN'];
  displayedColumns: string[] = ['ID', 'firstName', 'lastName', 'email', 'roles', 'delete'];
  dataSource = new MatTableDataSource<User>();
  userForm: FormGroup;
  loading = false;
  submitted = false;


  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.loadAllUsers();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['USER']
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
  }

  deleteUser(id: number) {
    this.userService.delete(id).pipe(first()).subscribe(() => {
      this.loadAllUsers();
    });
  }

  private loadAllUsers() {
    this.userService.getAll().pipe(first()).subscribe(users => {
      this.dataSource.data = users;
    });
  }

  get f() {
    return this.userForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.userForm.invalid) {
      return;
    }
    let rolez;
    if (this.f.roles.value === 'USER') {
      rolez = ['USER'];
    }
    if (this.f.roles.value === 'WORKER') {
      rolez = ['USER', 'WORKER'];
    }
    if (this.f.roles.value === 'ADMIN') {
      rolez = ['USER', 'WORKER', 'ADMIN'];
    }

    this.loading = true;
    this.userService.addUser(this.f.firstName.value, this.f.lastName.value, this.f.mail.value, this.f.password.value, rolez)
      .pipe(first())
      .subscribe(
        () => {
          this.loadAllUsers();
          location.reload();
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }
}

