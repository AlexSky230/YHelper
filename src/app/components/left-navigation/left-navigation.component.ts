import {Component} from '@angular/core';
import {MAIN_NAV} from '../../constants/constants';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})

export class LeftNavigationComponent {

  navItems = [
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

}
