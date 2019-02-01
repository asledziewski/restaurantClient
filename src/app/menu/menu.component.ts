import {Component, OnInit} from '@angular/core';
import {Dish} from 'src/app/_models/dish';
import {DishService} from 'src/app/_services/dish.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];

  constructor(private dishService: DishService, private domSanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.getDishes();
  }

  getDishes(): void {
    this.dishService.getDishes()
      .subscribe(dishes => this.dishes = dishes);
  }

  safeUrl(b64: string) {
    return this.domSanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + b64);
  }
}
