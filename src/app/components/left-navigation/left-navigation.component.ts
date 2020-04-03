import { Component, OnInit } from '@angular/core';
import {NbMenuItem} from '@nebular/theme';

@Component({
  selector: 'app-left-navigation',
  templateUrl: './left-navigation.component.html',
  styleUrls: ['./left-navigation.component.scss']
})
export class LeftNavigationComponent implements OnInit {

  constructor() { }

  navItems: NbMenuItem[] = [
    {
      title: 'Todo',
      icon: 'checkmark-square-outline',
      link: 'todo'
    },
    {
      title: 'Weather',
      icon: 'umbrella-outline',
      link: 'weather'
    },
    {
      title: 'Shopping List',
      icon: 'list-outline',
      link: 'shopping'
    },
    {
      title: 'Fridge Inventory',
      icon: 'clipboard-outline',
      link: 'fridge'
    },
    {
      title: 'Search',
      icon: 'search-outline',
      link: 'search'
    },
  ];

  ngOnInit(): void {
  }

}
