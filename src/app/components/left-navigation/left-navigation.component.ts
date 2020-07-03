import {Component, OnDestroy, OnInit} from '@angular/core';
import {ButtonIcons, MAIN_NAV, NamesForService, RouterMainPath} from '../../constants/constants';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../shared/user';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './right-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})

export class LeftNavigationComponent implements OnInit, OnDestroy{

  constructor(
    private localStorage: LocalStorageService,
    private router: Router,
    private authService: AuthService) {
  }

  public user: Observable<User>;
  public userImgUrl: string;
  public userName: string;
  public loginLink = RouterMainPath.login;
  public loginIcon = ButtonIcons.accountLogIn;

  public navItems = [
    {
      icon: MAIN_NAV.todo.icon,
      link: MAIN_NAV.todo.link
    },
    {
      icon: MAIN_NAV.weather.icon,
      link: MAIN_NAV.weather.link
    },
    {
      icon: MAIN_NAV.shoppingList.icon,
      link: MAIN_NAV.shoppingList.link
    },
    {
      icon: MAIN_NAV.fridgeInventory.icon,
      link: MAIN_NAV.fridgeInventory.link
    },
    {
      icon: MAIN_NAV.search.icon,
      link: MAIN_NAV.search.link
    },
  ];

  private subscription: Subscription;

  public ngOnInit(): void {
    this.user = this.authService.user.pipe(
      tap(user => {
        if (user) {
          this.userName = user.displayName;
          this.userImgUrl = user.photoURL;
        }
      })
    );

    // this.subscription = this.localStorage.getDataFromStorageById(NamesForService.user)
    //   .subscribe((user: User) => {
    //       this.authService.setUser(user);
    //   });
  }

  public logOut(): void {
    this.authService.SignOut();
    this.router.navigate(['login']).then();
  }

  public logIn(): void {
    this.router.navigate(['todo']).then();
  }

  public ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }

}
