import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {
  }



  getWeather() {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=Warszawa&APPID=0c461a2c0524472ef431bf8bbb835003`);
  }
}
