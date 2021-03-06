import { Component, OnInit } from '@angular/core';
import {WeatherService} from '@app/_services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  temperature: number;
  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    this.getTemperature();
  }
  getTemperature() {
    this.weatherService.getWeather().subscribe(w => {
      const weatherData = JSON.stringify(w);
      const  temp = JSON.parse(weatherData);
      this.temperature = temp.main.temp;
      this.temperature = this.temperature - 273.15;
    });


}

}
