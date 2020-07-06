import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Observable} from 'rxjs';
import {IsLoadingService} from '../../helpers/is-loading.service';
import {User} from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public isBusy: Observable<boolean>;
  public userObs: Observable<User>;

  constructor(
    private isLoading: IsLoadingService,
    private auth: AuthService,
  ) { }

  public ngOnInit(): void {
    this.isBusy = this.isLoading.isLoading;
    this.userObs = this.auth.fireUser;
  }

  public login() {
    this.auth.logInGoogle();
  }

  public logOut() {
    this.auth.logOut();
  }
}
