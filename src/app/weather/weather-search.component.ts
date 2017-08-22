import {Component, OnInit} from '@angular/core';
import {WeatherService} from './service/weather.service';
import { WeatherItem} from './weather-item';
import {Subject} from 'rxjs/Subject';


@Component({
  selector: 'weather-search',
  templateUrl: './weather-search.html',
  providers: [WeatherService]
})
export class WeatherSearchComponent implements OnInit {

  private searchStream = new Subject<string>();
  data: any = {};

  constructor(private weatherService: WeatherService) {}

  onSubmit(location: string) {
    this.weatherService.searchWeatherData(location)
      .subscribe(
        data => {
          const weatherItem = new WeatherItem(data.name, data.weather[0].description, data.main.temp);
          this.weatherService.addWeatherItem(weatherItem);
        }
      );
  }

  onSearchLocation(cityName: string) {
    this.searchStream
      .next(cityName);
  }

  ngOnInit() {
    this.searchStream
      .debounceTime(500)
      .distinctUntilChanged()
      .switchMap((input: string) => this.weatherService.searchWeatherData(input))
      .subscribe(
        data => this.data = data
      );
  }
}
