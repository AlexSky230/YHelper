import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {SearchShortcutService} from 'helpers/search-shortcut.service';
import {SearchShortcut} from 'shared/classes/search-shortcut';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ButtonIcons, CoreLabels} from 'shared/constants/constants';

@Component({
  selector: 'app-shortcut-form',
  templateUrl: './shortcut-form.component.html',
  styleUrls: ['./shortcut-form.component.scss']
})
export class ShortcutFormComponent implements OnInit, OnDestroy {

  public newShortcut: SearchShortcut;
  public buttonIcons = ButtonIcons;
  public coreLabels = CoreLabels;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ShortcutFormComponent>,
    private searchShortcutService: SearchShortcutService,
  ) {
  }

  ngOnInit(): void {
    this.newShortcut = new SearchShortcut();
  }

  public addShortcut(): void {
    if (this.newShortcut.link) {
      this.newShortcut.shortTitle = (this.newShortcut.link.length < 5) ?
        this.newShortcut.link : this.newShortcut.link.slice(0, 4);
      this.newShortcut.title = (this.newShortcut.link.length < 20) ?
        this.newShortcut.link : this.newShortcut.link.slice(0, 20) + '...';
      this.newShortcut.link = CoreLabels.linkPlaceholder + this.newShortcut.link;
      this.searchShortcutService.addShortcut(this.newShortcut);
      this.newShortcut = new SearchShortcut();
      this.closeOverlay();
    }
  }

  public closeOverlay(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.dialogRef.close();
  }
}
