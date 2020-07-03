import { Component } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {User} from '../../shared/user';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private authService: AuthService,
  ) { }

  public user: Observable<User> = this.authService.user;

  public login() {
    this.authService.SignInWithGoogle();
  }

  public logOut() {
    this.authService.SignOut();
  }
}
