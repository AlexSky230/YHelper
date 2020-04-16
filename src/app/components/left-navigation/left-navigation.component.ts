import { Component, OnInit } from '@angular/core';
import {appColor, MAIN_NAV} from '../../constants/constants';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {

  appColor = appColor;

  constructor() { }

  navItems = [
    {
      title: '',
      icon: MAIN_NAV.todo.icon,
      link: MAIN_NAV.todo.link
    },
    {
      title: '',
      icon: MAIN_NAV.weather.icon,
      link: MAIN_NAV.weather.link
    },
    {
      title: '',
      icon: MAIN_NAV.shoppingList.icon,
      link: MAIN_NAV.shoppingList.link
    },
    {
      title: '',
      icon: MAIN_NAV.fridgeInventory.icon,
      link: MAIN_NAV.fridgeInventory.link
    },
    {
      title: '',
      icon: MAIN_NAV.search.icon,
      link: MAIN_NAV.search.link
    },
  ];

  ngOnInit(): void {
  }

}
