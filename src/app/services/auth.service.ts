import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {IsLoadingService} from '../helpers/is-loading.service';

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
    public router: Router,
    public afAuth: AngularFireAuth,
  ) {
    this.fireUser = afAuth.authState;
  }

  // Firebase Google Sign-in
  public logInGoogle(): void {
    // // following code helps to return user to the page where they were before they were redirected
    // const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // this.localStorage.addDataToStorage('returnUrl', returnUrl);
    // this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider()).then(() => {
    //     this.router.navigate([this.localStorage.getDataFromStorageById('returnUrl')]);
    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider());
  }

  // Firebase Logout
  public logOut() {
    return this.afAuth.signOut().then(() => {
        this.router.navigate(['login']);
      });
  }

}
