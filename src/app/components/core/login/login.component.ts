import {Component, OnInit} from '@angular/core';
import {AuthService} from 'shared/services/auth.service';
import {Observable} from 'rxjs';
import {IsLoadingService} from 'helpers/is-loading.service';
import {User} from 'firebase';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  // public isBusy: Observable<boolean>;
  public isBusy: boolean;
  public userObs: Observable<User>;

  constructor(
    private isLoading: IsLoadingService,
    private auth: AuthService,
  ) { }

  public ngOnInit(): void {
    this.isLoading.setIsLoading(true);
    this.isLoading.isLoading.subscribe(busy => {
      console.log('app is Busy: ' + busy);
      this.isBusy = busy;
    });
    this.userObs = this.auth.fireUser;
  }

  public login() {
    this.auth.logInGoogle();
  }

  public logOut() {
    this.auth.logOut();
  }
}
