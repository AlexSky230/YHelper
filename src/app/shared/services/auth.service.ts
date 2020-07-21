import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth, User} from 'firebase';
import {Observable, of} from 'rxjs';
import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {switchMap} from 'rxjs/operators';
import {AppUser} from 'shared/models/app.user';
import {IsLoadingService} from 'helpers/is-loading.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public appUser$: Observable<AppUser>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
    private isLoading: IsLoadingService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.appUser$ = afAuth.authState.pipe(
      switchMap(fireUser => {
        if (fireUser) {
          // returns observable of app User in Database using uid
          return this.afs.doc<AppUser>(`users/${fireUser.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  // Firebase create user using email and pass
  public async createUserWithEmail(name: string, email: string, password: string): Promise<void> {
    this.isLoading.setIsLoading(true);
    this.setReturnUrl();
    await this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        this.updateUserData(userCredential.user, name);
      })
      .catch((error) => {
        window.alert(error.message);
      });
    this.isLoading.setIsLoading(false);
  }

  // Firebase Google Sign-in
  public async logInWithGoogle(): Promise<void> {
    this.isLoading.setIsLoading(true);
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);

    this.setReturnUrl();
    this.isLoading.setIsLoading(false);

    return this.updateUserData(credential.user);
  }

  // Firebase login using email and pass
  public async logInWithEmail(email: string, password: string): Promise<void> {
    this.isLoading.setIsLoading(true);
    this.setReturnUrl();
    await this.afAuth.signInWithEmailAndPassword(email, password)
      .catch((error) => {
        window.alert(error.message);
      });
    this.isLoading.setIsLoading(false);
  }

  // Firebase Logout
  public async logOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['login']);
  }

  private setReturnUrl(): void {
    // return URL returns user to the page where they were before redirect
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
  }

  private updateUserData(user: User, name?: string): Promise<void> {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<AppUser> = this.afs.doc(`users/${user.uid}`);
    const data = {
      uid: user.uid,
      displayName: user.displayName || name,
      email: user.email,
      photoUrl: user.photoURL,
    };

    return userRef.set(data, {merge: true});
  }
}
