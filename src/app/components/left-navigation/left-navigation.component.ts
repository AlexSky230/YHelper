import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';
import {MainNav} from '../../constants/constants';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {

  constructor() { }

  navItems: NbMenuItem[] = [
    {
      title: MainNav.todo.title,
      icon: MainNav.todo.icon,
      link: MainNav.todo.link
    },
    {
      title: MainNav.weather.title,
      icon: MainNav.weather.icon,
      link: MainNav.weather.link
    },
    {
      title: MainNav.shoppingList.title,
      icon: MainNav.shoppingList.icon,
      link: MainNav.shoppingList.link
    },
    {
      title: MainNav.fridgeInventory.title,
      icon: MainNav.fridgeInventory.icon,
      link: MainNav.fridgeInventory.link
    },
    {
      title: MainNav.search.title,
      icon: MainNav.search.icon,
      link: MainNav.search.link
    },
  ];

  ngOnInit(): void {
  }

}
