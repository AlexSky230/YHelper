import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IdService {
  /**
   * get unique ID/timestamp: current time in milliseconds since 1970
   */
  public getId() {
    return new Date().getTime();
  }
}
