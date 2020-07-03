import {Injectable, NgZone} from '@angular/core';
import {User} from '../shared/user';
import {Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {BehaviorSubject, ReplaySubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject(new User());
  public user = this.userSubject.asObservable();

  constructor(
    public router: Router,
    public ngZone: NgZone,
    public afAuth: AngularFireAuth,
  ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userSubject.next(user);
        this.router.navigate(['/weather']);
      } else {
        this.userSubject.next(new User());
      }
    });
  }

  // // Firebase SignInWithPopup
  // OAuthProvider(provider) {
  //   return this.afAuth.signInWithPopup(provider)
  //     .then((res) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['login']);
  //       });
  //     }).catch((error) => {
  //       window.alert(error);
  //     });
  // }
  //
  // // Firebase Google Sign-in
  // SignInWithGoogle() {
  //   return this.OAuthProvider(new auth.GoogleAuthProvider())
  //     .then(res => {
  //       console.log('Successfully logged in!');
  //     }).catch(error => {
  //       console.log(error);
  //     });
  // }

  public setUser(user: User): void {
    this.userSubject.next(user);
  }

  // Firebase Google Sign-in
  public SignInWithGoogle(): void {
    this.afAuth.signInWithRedirect(new auth.GoogleAuthProvider())
      .then(res => {
        console.log('Successfully logged in!');
      }).catch(error => {
      console.log(error + 'could not log in');
    });
  }


  // Firebase Logout
  SignOut() {
    return this.afAuth.signOut().then(() => {
      this.router.navigate(['login']).then();
    });
  }

}
