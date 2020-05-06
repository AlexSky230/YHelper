import {Injectable} from '@angular/core';
import {LocalStorageService} from '../services/local-storage.service';
import {ShortcutIconPipe} from './pipes/shortcut-icon.pipe';
import {ShortcutTitlePipe} from './pipes/shortcut-title.pipe';
import {SearchShortcut} from './classes/search-shortcut';

@Injectable({
  providedIn: 'root'
})
export class SearchShortcutService {

  constructor(
    private shortcutIconPipe: ShortcutIconPipe,
    private shortcutTitlePipe: ShortcutTitlePipe,
    private localStorage: LocalStorageService
  ) {
  }

  shortcutsArray: SearchShortcut[] = [];

  public addShortcut(shortcut: SearchShortcut) {
    if (shortcut.link !== '') {
      shortcut.icon = shortcut.link + '/favicon.ico';
      shortcut.title = this.shortcutTitlePipe.transform(shortcut.link);
      shortcut.shortTitle = this.shortcutIconPipe.transform(shortcut.link);
      this.shortcutsArray.push(shortcut);
      this.saveToStorage('shortcuts', this.shortcutsArray);
    }
  }

  public getStoredItems(key: string): void {
    this.localStorage
      .getDataFromStorageById(key)
      .subscribe((data) => {
        if (data === undefined) {
          data = [];
        }
        this.buildShortcutList(data);
      });
  }

  private buildShortcutList(items: SearchShortcut[]): void {
    this.shortcutsArray = items;
  }

  private saveToStorage(key: string, array: SearchShortcut[]): void {
    this.localStorage.addDataToStorage(key, array);
  }

  public deleteShortcutByLink(shortcut: SearchShortcut): void {
    this.shortcutsArray = this.shortcutsArray
      .filter(item => item.link !== shortcut.link);
    this.saveToStorage('shortcuts', this.shortcutsArray);
  }

  public getShortcuts(): SearchShortcut[] {
    return this.shortcutsArray;
  }

}
