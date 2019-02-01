import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {
  }



  getWeather() {
    return this.http.get('http://api.openweathermap.org/data/2.5/weather?q=Warszawa&APPID=bb24199c0da7636a94dc783d62ad98d4');
  }
}
