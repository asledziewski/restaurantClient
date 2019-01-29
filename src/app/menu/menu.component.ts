import {Component, OnInit} from '@angular/core';
import {Dish} from 'src/app/_models/dish';
import {DishService} from 'src/app/_services/dish.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  constructor(private dishService: DishService) {
  }

  ngOnInit() {
    this.getDishes();
  }

  getDishes(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes);
  }
}
