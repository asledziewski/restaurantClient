import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from '@app/_models';
import {AlertService, AuthenticationService, ReservationService} from '@app/_services';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {Time} from '@angular/common';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Reservation} from '@app/_models/reservation';

@Component({
  selector: 'app-service-reservation',
  templateUrl: './service-reservation.component.html',
  styleUrls: ['./service-reservation.component.css']
})
export class ServiceReservationComponent implements OnInit  {
  currentUser: User;
  reservationForm: FormGroup;
  loading = false;
  submitted = false;
  public min = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 12, 0);
  public max = new Date(2019, 11, 31, 20, 0);
  reservations: Reservation[] = [];
  displayedColumns = ['reservationId', 'rTableNumber', 'date', 'userId', 'Options'];
  dataSource = new MatTableDataSource<Reservation>();

  constructor(private authenticationService: AuthenticationService, private alertService: AlertService, private reservationService: ReservationService,  private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.reservationForm = this.formBuilder.group({
      attendees: ['2', [Validators.required, Validators.min(1), Validators.max(10), Validators.pattern('[0-9]{1,}')]],
      date: [this.min, Validators.required]
    });
    this.loadReservations();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // convenience getter for easy access to form fields
  get f() { return this.reservationForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.reservationForm.invalid) {
      return;
    }

    this.loading = true;
    this.reservationService.reserve(this.f.attendees.value, this.f.date.value, null)
      .pipe(first())
      .subscribe(
        () => {
          location.reload();
          this.alertService.success('Successfully made a reservation.', true);
        },
        error => {
          this.alertService.error(error);
          this.loading = false;
        });
  }

  public myFilter = (d: Date): boolean => {
    const minutes = d.getMinutes();
    const hours = d.getHours();
    return ((minutes % 30) === 0) && (((hours >= 10) && (hours <= 20)) || hours === 0);

  }

  private loadReservations() {
    this.reservationService.getReservations().pipe(first()).subscribe(reservations => {
      this.dataSource.data = reservations;
    });
  }

  private deleteReservation(id: number) {
    this.reservationService.deleteReservation(id).pipe(first()).subscribe( () => {
      this.loadReservations();
    }, e => this.alertService.error(e));
  }
}
