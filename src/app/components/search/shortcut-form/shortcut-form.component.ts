import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {SearchShortcutService} from '../../../helpers/search-shortcut.service';
import {FormControl, Validators} from '@angular/forms';
import {SearchShortcut} from '../../../helpers/classes/search-shortcut';
import {OverlayService} from '../../../helpers/overlay.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {buttonIcons, coreLabels} from '../../../constants/constants';

@Component({
  selector: 'app-shortcut-form',
  templateUrl: './shortcut-form.component.html',
  styleUrls: ['./shortcut-form.component.scss']
})
export class ShortcutFormComponent implements OnInit, OnDestroy {

  public newShortcut: SearchShortcut;
  public buttonIcons = buttonIcons;
  public coreLabels = coreLabels;

  // private myreg = /http(?:s)?:\/\/(?:[\w-]+\.)*([\w-]{1,63})(?:\.(?:\w{3}|\w{2}))(?:$|\/)/i;
  // public url = new FormControl(this.newShortcut.link, [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<ShortcutFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private searchShortcutService: SearchShortcutService,
  ) {
  }

  ngOnInit(): void {
    this.newShortcut = new SearchShortcut();
  }

  public addShortcut(): void {
    this.newShortcut.shortTitle = (this.newShortcut.link.length < 5) ?
      this.newShortcut.link : this.newShortcut.link.slice(0, 4);
    this.newShortcut.title = (this.newShortcut.link.length < 20) ?
      this.newShortcut.link : this.newShortcut.link.slice(0, 20) + '...';
    this.newShortcut.link = coreLabels.linkPlaceholder + this.newShortcut.link;
    this.searchShortcutService.addShortcut(this.newShortcut);
    this.newShortcut = new SearchShortcut();
  }

  public closeOverlay(): void {
    this.dialogRef.close();
  }

  ngOnDestroy() {
    this.dialogRef.close();
  }
}
