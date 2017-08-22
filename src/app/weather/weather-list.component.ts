import {Component, OnInit} from '@angular/core';
import {WeatherItem} from './weather-item';
import {WeatherService} from './service/weather.service';

@Component({
  selector: 'weather-list',
  templateUrl: './weather-list.html',
  providers: [WeatherService]
})
export class WeatherListComponent implements OnInit {

  weatherItems: WeatherItem[];

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): any {
    this.weatherService.clearWeatherItems();
    this.weatherItems = this.weatherService.getWeatherItems();
  }

}
