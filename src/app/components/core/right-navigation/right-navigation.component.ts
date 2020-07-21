import {Component} from '@angular/core';
import {MAIN_NAV, RouterMainPath} from 'shared/constants/constants';
import {AuthService} from 'shared/services/auth.service';
import {AppUser} from 'shared/models/app.user';


@Component({
  selector: 'app-right-navigation',
  templateUrl: './right-navigation.component.html',
  styleUrls: ['./right-navigation.component.scss']
})

export class RightNavigationComponent {

  public appUser: AppUser;

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

  constructor(private auth: AuthService) {
    // don't need to unsubscribe. It is only one component in the app that ais always active
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  public logOut(): void {
    this.auth.logOut();
  }

}
