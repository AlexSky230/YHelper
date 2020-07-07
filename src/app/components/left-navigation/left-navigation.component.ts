import {Component, OnInit} from '@angular/core';
import {ButtonIcons, MAIN_NAV, RouterMainPath} from '../../constants/constants';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LocalStorageService} from '../../services/local-storage.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {User} from 'firebase';
import {IsLoadingService} from '../../helpers/is-loading.service';
import {UserService} from '../../services/user.service';
import {AppUser} from '../../models/app.user';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './right-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})

export class LeftNavigationComponent implements OnInit {

  constructor(
    private isLoading: IsLoadingService,
    private localStorage: LocalStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private auth: AuthService) {
  }

  public appUser: AppUser;
  public user$: Observable<User>;
  public userImgUrl: string;
  public userName: string;

  public loginIcon = ButtonIcons.accountLogIn;
  public loginPath = RouterMainPath.login;

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

  public ngOnInit(): void {
    this.auth.appUser$.subscribe(user => this.appUser = user);

    this.user$ = this.auth.fireUser.pipe(
      tap(user => {
        if (user) {
          const returnUrl = localStorage.getItem('returnUrl'); // this URL is set in authService

          this.userService.save(user);
          this.userName = user.displayName;
          // this is needed to return user to the page where he was before redirect
          this.userImgUrl = user.photoURL;
          this.isLoading.setIsLoading(false);
          this.router.navigateByUrl(returnUrl);
        } else {
          this.userName = '';
          this.userImgUrl = '';
        }
      })
    );
  }

  public logOut(): void {
    this.auth.logOut();
  }
}
