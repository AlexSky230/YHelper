import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  // back end done on PHP on my brothers server, it will be there for as long as needed
  // readonly ROOT_URL = 'https://mamaev.net/darkskyproxy.php?';
  readonly ROOT_URL = 'http://api.weatherstack.com/forecast';


  constructor(private http: HttpClient) {
  }

  public getForecast(latitude: number, longitude: number): Observable<any> {
    let params = new HttpParams()
      .set('access_key', '7e1a1537ff04327f7c89b30b5b38cfbe')
      .set('query', latitude.toString() + "," + longitude.toString())
      .set('hourly', '3');

    return this.http.get(this.ROOT_URL, { params });
  }
}
