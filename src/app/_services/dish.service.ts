import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {Dish} from '../_models/dish';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private dishesUrl = 'http://localhost:8080/dishes';

  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  /** GET heroes from the server */
  getDishes(): Observable<Dish[]> {
    return this.http.get<Dish[]>(this.dishesUrl)
      .pipe(
        tap(_ => this.log('fetched dishes')),
        catchError(this.handleError('getDishes', []))
      );
  }

  // /** PUT: update the hero on the server */
  // updateHero (hero: Hero): Observable<any> {
  //   return this.http.put(this.heroesUrl, hero, httpOptions).pipe(
  //     tap(_ => this.log(`updated hero id=${hero.id}`)),
  //     catchError(this.handleError<any>('updateHero'))
  //   );
  // }

  getDish(id: number): Observable<Dish> {
    const url = `${this.dishesUrl}/${id}`;
    return this.http.get<Dish>(url).pipe(
      tap(_ => this.log(`fetched dish id=${id}`)),
      catchError(this.handleError<Dish>(`getDish id=${id}`))
    );
  }

  /** POST: add a new hero to the server */
  addDish(dish: Dish): Observable<Dish> {
    return this.http.post<Dish>(this.dishesUrl, dish, httpOptions).pipe(
      tap((dish: Dish) => this.log(`added dish w/ id=${dish.id}`)),
      catchError(this.handleError<Dish>('Dish'))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
