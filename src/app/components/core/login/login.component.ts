import {Component} from '@angular/core';
import {AuthService} from 'shared/services/auth.service';
import {Observable} from 'rxjs';
import {IsLoadingService} from 'helpers/is-loading.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {AppUser} from 'shared/models/app.user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public isBusy: Observable<boolean>;
  public appUser: AppUser;
  public isRegistering: boolean;

  public logInForm: FormGroup;
  public userNameControl = new FormControl('', [Validators.required, Validators.minLength(2)]);
  public userEmailControl = new FormControl('', [Validators.required, Validators.email]);
  public userPasswordControl = new FormControl('', [Validators.required, Validators.minLength(6)]);

  // private subscription: Subscription;

  constructor(private isLoading: IsLoadingService, public auth: AuthService, fb: FormBuilder) {
    auth.appUser$.pipe(
      tap(appUser => {
        console.log('logincomp user :' + appUser);
        this.appUser = appUser;
      })
    );
    this.isRegistering = false;
    this.isBusy = isLoading.isLoading;
    this.logInForm = fb.group({
      userName: this.userNameControl,
      userEmail: this.userEmailControl,
      userPassword: this.userPasswordControl,
    });
  }

  public loginWithGoogle() {
    this.auth.logInWithGoogle();
  }

  public logInWithEmail(): void {
    this.auth.logInWithEmail(this.userEmailControl.value, this.userPasswordControl.value);
  }

  public signUpWithEmail(): void {
    this.auth.createUserWithEmail(this.userNameControl.value, this.userEmailControl.value, this.userPasswordControl.value);
  }

  public logOut() {
    this.auth.logOut();
  }

  public onRegisterClicked(): void {
    this.isRegistering = !this.isRegistering;
    this.userNameControl.reset();
    this.userPasswordControl.reset();
    this.userEmailControl.reset();
  }
}
