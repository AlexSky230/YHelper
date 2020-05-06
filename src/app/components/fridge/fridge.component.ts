import {Component, OnInit} from '@angular/core';
import {FridgeService} from '../../helpers/fridge.service';

@Component({
  selector: 'app-fridge',
  templateUrl: './fridge.component.html',
  styleUrls: ['./fridge.component.scss']
})
export class FridgeComponent implements OnInit {

  constructor(private fridgeService: FridgeService) {
  }

  ngOnInit(): void {
    this.fridgeService.getStoredItems('fridgeItems');
    this.fridgeService.getStoredShelfItem();
    this.fridgeService.setShelfItemList();
  }

}
