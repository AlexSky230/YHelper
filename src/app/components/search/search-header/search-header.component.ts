import {Component} from '@angular/core';
import {SearchShortcutService} from '../../../helpers/search-shortcut.service';
import {ShortcutFormComponent} from '../shortcut-form/shortcut-form.component';
import {OverlayService} from '../../../helpers/overlay.service';
import {ButtonIcons, CoreLabels} from '../../../constants/constants';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss']
})
export class SearchHeaderComponent {

  public buttonIcons = ButtonIcons;
  public coreLabels = CoreLabels;
  public searchLink: string;

  constructor(
    public dialog: MatDialog,
    private searchShortcutService: SearchShortcutService,
    private overlayService: OverlayService
  ) {
    this.searchLink = 'https://google.com/search?q=';
  }

  public openShortcutForm(): void {
    this.dialog.open(ShortcutFormComponent, {
      width: '80vw'
    });
  }

  public get portalAttached(): boolean {
    return this.overlayService.portalAttached;
  }
}
