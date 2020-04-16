import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ForecastLocation} from '../../../helpers/classes/forecastLocation';

@Component({
  selector: 'app-forecast-header',
  templateUrl: './forecast-header.component.html',
  styleUrls: ['./forecast-header.component.scss']
})
export class ForecastHeaderComponent {

  @Input() activeLocation: ForecastLocation;
  @Input() latitude: number;
  @Input() longitude: number;
  @Input() locationTitles: string[];
  @Output() citySelected = new EventEmitter();

  public cityClicked(location: string): void {
    this.citySelected.emit(location);
  }
}
