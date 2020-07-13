import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable, of} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {IsLoadingService} from 'helpers/is-loading.service';

import {switchMap, tap} from 'rxjs/operators';
import {UserService} from './user.service';
import {AppUser} from 'shared/models/app.user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public fireUser: Observable<User>;

  // // following code implements subject, but can be done without it for now
  // private userSubject = new BehaviorSubject(this.fireUser);
  // public user = this.userSubject.asObservable();

  constructor(
    private isLoading: IsLoadingService,
    private localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private userService: UserService,
    public router: Router,
    public afAuth: AngularFireAuth,
  ) {
    this.fireUser = afAuth.authState;
  }

  // Firebase Google Sign-in
  public logInGoogle(): void {
    // following helps to return user to the page where they were before they were redirected
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  // Firebase Logout
  public logOut() {
    return this.afAuth.signOut().then(() => {
        this.router.navigate(['login']);
      });
  }

  get appUser$(): Observable<AppUser> {
    return this.fireUser.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }
      }),
      tap(user => {
        this.isLoading.setIsLoading(false);
        console.log(user);
      })
    );
  }

}
