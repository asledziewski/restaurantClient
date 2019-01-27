import {Component, OnDestroy, OnInit} from '@angular/core';
import {Bill} from '@app/_models/bill';
import {BillPosition} from '@app/_models/billPosition';
import {BillService} from '@app/_services/bill.service';
import {BillPositionService} from '@app/_services/bill-position.service';
import {AlertService, AuthenticationService} from '@app/_services';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from '@app/_models';
import {debounceTime, distinctUntilChanged, first, switchMap} from 'rxjs/operators';
import {Dish} from '@app/_models/dish';
import {DishService} from '@app/_services/dish.service';
import {Observable, Subject} from 'rxjs';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.css']
})
export class BillDetailsComponent implements OnInit {

  bill: Bill;
  id: number;
  rtableId: number;
  status: string;
  positions: BillPosition[];
  currentUser: User;
  dishes$: Observable<Dish[]>;
  value: number;
  private searchTerms = new Subject<string>();

  constructor(private billService: BillService, private billPositionService: BillPositionService, private dishService: DishService,
              private authenticationService: AuthenticationService, private alertService: AlertService, private router: Router,
              private route: ActivatedRoute) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.billService.getBillById(this.id).subscribe(bill => {
      this.bill = bill;
    });
    this.billService.getBillPositions(this.id).subscribe( positions => this.positions = positions);
  }

  ngOnInit() {
    this.dishes$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.dishService.findDishes(term)),
    );
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }


  deletePosition(positionId: number) {
    this.billPositionService.deleteBillPosition(positionId).subscribe( () => {
      this.billService.getBillPositions(this.id).subscribe( positions => this.positions = positions);
      this.billService.getBillById(this.id).subscribe( bill => this.bill = bill);
    });
  }

  addPosition(dishId: number) {
    let dish;
    this.dishService.getDishById(dishId).subscribe( d => {
      dish = d;
        this.billPositionService.addBillPosition(this.bill.billId, dish).pipe(first())
          .subscribe(
            () => {
              this.billService.getBillPositions(this.id).subscribe( positions => this.positions = positions);
              this.billService.getBillById(this.id).subscribe( bill => this.bill = bill);
            });
    }
    );
  }

  closeBill() {
    const billy = this.bill;
    billy.status = 'PAID';
    this.billService.updateBill(billy).pipe(first()).subscribe(() => {
      this.billService.getBillById(this.id).subscribe(bill => this.bill = bill);
      this.router.navigate(['/service/serviceTable']);
    });


  }
}
