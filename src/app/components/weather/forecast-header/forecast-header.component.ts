import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-forecast-header',
  templateUrl: './forecast-header.component.html',
  styleUrls: ['./forecast-header.component.scss']
})
export class ForecastHeaderComponent {

  @Input() activeLocation: string;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() locationNames: string[];
  @Output() citySelected = new EventEmitter();

  private cityClicked(location: string): void {
    this.citySelected.emit(location);
  }


}
