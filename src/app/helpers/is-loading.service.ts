import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {

  private busy = new Subject<boolean>();
  public isLoading = this.busy.asObservable();

  public setIsLoading(value: boolean): void {
    this.busy.next(value);
  }
}
