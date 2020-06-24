import {Component} from '@angular/core';
import {ButtonIcons, CoreLabels} from '../../../constants/constants';
import {slideOut} from '../../../animations/animations';

@Component({
  selector: 'app-search-header',
  templateUrl: './search-header.component.html',
  styleUrls: ['./search-header.component.scss'],
  animations: [slideOut]
})
export class SearchHeaderComponent {

  public buttonIcons = ButtonIcons;
  public message: string;
  public coreLabels = CoreLabels;
  public searchLink: string;
  public isInputVisible: boolean;

  constructor() {
    this.searchLink = 'https://google.com/search?q=';
    this.message = '';
  }

  public toggleInput(): void {
    this.isInputVisible = !this.isInputVisible;
    this.message = '';
  }

  public search(): void {
    window.open(this.searchLink + this.message, '_blank');
    this.isInputVisible = false;
  }
}
