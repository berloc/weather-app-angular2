import {Injectable} from '@angular/core';
import {WEATHER_ITEMS} from '../weather.data';
import {Observable} from 'rxjs/Observable';
import {Http} from '@angular/http';
import 'rxjs/Rx';
import { WeatherItem} from '../weather-item';



@Injectable()
export class WeatherService {

  constructor(private http: Http) {}

  getWeatherItems() {
    return WEATHER_ITEMS;
  }

  searchWeatherData(cityName: string): Observable<any> {
    return this.http.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=bbc99c41f91693e1e117b7f361f9e821&units=metric`)
      .map(res => res.json())
      .catch((err => {
        console.log(err);
        return Observable.throw(err.json());
      }));
  }

  addWeatherItem(weatherItem: WeatherItem) {
    WEATHER_ITEMS.push(weatherItem);
  }

  clearWeatherItems() {
    WEATHER_ITEMS.splice(0);
  }
}
