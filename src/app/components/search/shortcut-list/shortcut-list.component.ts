import {Component} from '@angular/core';
import {SearchShortcutService} from '../../../helpers/search-shortcut.service';
import {SearchShortcut} from '../../../helpers/classes/search-shortcut';

@Component({
  selector: 'app-shortcut-list',
  templateUrl: './shortcut-list.component.html',
  styleUrls: ['./shortcut-list.component.scss']
})
export class ShortcutListComponent {

  constructor(private searchShortcutService: SearchShortcutService) {
  }

  public get shortcuts(): SearchShortcut[] {
    return this.searchShortcutService.getShortcuts();
  }

  public deleteShortcut(shortcut: SearchShortcut) {
    this.searchShortcutService.deleteShortcutByLink(shortcut);
  }

}
