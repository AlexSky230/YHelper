import {Component} from '@angular/core';
import {SearchShortcutService} from 'helpers/search-shortcut.service';
import {SearchShortcut} from 'shared/classes/search-shortcut';
import {ButtonIcons, CoreLabels} from 'shared/constants/constants';
import {ShortcutFormComponent} from '../shortcut-form/shortcut-form.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-shortcut-list',
  templateUrl: './shortcut-list.component.html',
  styleUrls: ['./shortcut-list.component.scss']
})
export class ShortcutListComponent {

  public buttonIcons = ButtonIcons;
  public coreLabels = CoreLabels;

  constructor(
    public dialog: MatDialog,
    private searchShortcutService: SearchShortcutService) {
  }

  public get shortcuts(): SearchShortcut[] {
    return this.searchShortcutService.getShortcuts();
  }

  public deleteShortcut(shortcut: SearchShortcut) {
    this.searchShortcutService.deleteShortcutByLink(shortcut);
  }

  public addShortcutClicked() {
    this.dialog.open(ShortcutFormComponent, {
      width: '80vw'
    });
  }

}
