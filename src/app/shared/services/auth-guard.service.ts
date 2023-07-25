import {Injectable} from '@angular/core';
import {CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {finalize, map, take} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route, state: RouterStateSnapshot): Observable<boolean> {
    const returnUrl = localStorage.getItem('returnUrl');
    return this.auth.appUser$.pipe(
      take(1),
      map(user => {
        if (!user) {
          return true;
        } else {
          this.router.navigate([returnUrl]);
          return false;
        }
      }),
    );
  }

}
