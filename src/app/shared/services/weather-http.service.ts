import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class WeatherService {

  // back end done on PHP on my brothers server, it will be there for as long as needed
  readonly ROOT_URL = 'https://mamaev.net/apiproxy/darkskyproxy.php?';

  constructor(private http: HttpClient) {
  }

  public getForecast(latitude: number, longitude: number): Observable<any> {
    let params = new HttpParams();
    params = params.set('latitude', latitude.toString());
    params = params.set('longitude', longitude.toString());
    params = params.set('units', 'units=auto');

    return this.http.get(this.ROOT_URL, {params});
  }
}
