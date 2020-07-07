import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class IsLoadingService {

  private busy = new BehaviorSubject<boolean>(false);
  public isLoading = this.busy.asObservable();

  public setIsLoading(value: boolean): void {
    this.busy.next(value);
  }
}
