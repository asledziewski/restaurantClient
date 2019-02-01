import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Dish} from '../_models/dish';
import {environment} from '@environments/environment';
import {Reservation} from '@app/_models/reservation';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishesUrl = `${environment.apiUrl}/dishes`;

  constructor(private http: HttpClient) {
  }

  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl);
  }

  updateDish (dish: Dish) {
    return this.http.put(this.dishesUrl, {dish});
  }

  getDishById(id: number): Observable <Dish> {
    return this.http.get<Dish>(`${this.dishesUrl}/${id}`);
  }

  addDish(englishName: string, polishName: string, price: number, image: string) {
    return this.http.post<any>(this.dishesUrl, {englishName, polishName, price, image});
  }

  deleteDish(id: number) {
    return this.http.delete(`${this.dishesUrl}/${id}`);
  }

  findDishes(term: string): Observable<Dish[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Dish[]>(`${this.dishesUrl}/name=${term}`);
  }

}
