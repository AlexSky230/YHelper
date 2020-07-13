import {Injectable} from '@angular/core';
import {AuthService} from 'shared/services/auth.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {

  constructor(private auth: AuthService) {
  }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => appUser.isAdmin)
    );
  }
}
