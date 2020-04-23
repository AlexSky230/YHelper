import {Injectable} from '@angular/core';
import {CategoriesColors} from './classes/categories-colors';

@Injectable({
  providedIn: 'root'
})
export class CategoriesColorsService {

  public categoriesColors: CategoriesColors[] = [
    {type: 'Vegetables and Fruits', color: '#2b9589', order: 1, selected: false},
    {type: 'Meat and Fish', color: '#eb2a5e', order: 2, selected: false},
    {type: 'Dairy Products', color: '#d2dee6', order: 3, selected: false},
    {type: 'Drinks', color: '#3699f6', order: 4, selected: false},
    {type: 'Other', color: '#f05649', order: 5, selected: false},
    {type: 'Other', color: '#d1c635', order: 6, selected: false},
    {type: 'Other', color: '#2c43a0', order: 7, selected: false},
    {type: 'Other', color: '#6542b9', order: 8, selected: false},
    {type: 'Other', color: '#898989', order: 9, selected: false},
  ];

  public colorsToDefault(): void {
    this.categoriesColors.forEach(item => item.selected = false);
  }

  public getAllCategories(): CategoriesColors[] {
    return this.categoriesColors;
  }

  public getCategoriesForFridge(): CategoriesColors[] {
    return this.categoriesColors
      .filter((a) =>
        a.order < 5 || a.order === 9);
  }
}
