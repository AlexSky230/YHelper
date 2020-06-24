import { Component, OnInit } from '@angular/core';
import {SearchShortcutService} from '../../helpers/search-shortcut.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor(private searchShortcutService: SearchShortcutService) { }

  ngOnInit(): void {
    this.searchShortcutService.getStoredItems('shortcuts');
  }
}
