import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {

  private busy = new ReplaySubject<boolean>();
  public isLoading = this.busy.asObservable();

  public setIsLoading(value: boolean): void {
    this.busy.next(value);
  }
}
