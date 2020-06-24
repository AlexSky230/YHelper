import {Injectable} from '@angular/core';
import {ColorItem} from './classes/color-item';

@Injectable({
  providedIn: 'root'
})
export class CategoriesColorsService {

  public categoriesColors: ColorItem[] = [
    {key: 'key', title: 'Vegetables and Fruits', color: '#57b053', order: 1, selected: false},
    {key: 'key', title: 'Meat and Fish', color: '#eb4334', order: 2, selected: false},
    {key: 'key', title: 'Dairy Products', color: '#d2dee6', order: 3, selected: false},
    {key: 'key', title: 'Drinks', color: '#3aa7f3', order: 4, selected: false},
    {key: 'key', title: 'Other', color: '#f89907', order: 5, selected: false},
    {key: 'key', title: 'Other', color: '#fced42', order: 6, selected: false},
    {key: 'key', title: 'Other', color: '#454eb4', order: 7, selected: false},
    {key: 'key', title: 'Other', color: '#6735b6', order: 8, selected: false},
    {key: 'key', title: 'Other', color: '#9e9e9e', order: 9, selected: true},
  ];

  public colorsToDefault(): void {
    this.categoriesColors.forEach(item => item.selected = false);
  }

  public getAllCategories(): ColorItem[] {
    return this.categoriesColors;
  }

  public getCategoriesForFridge(): ColorItem[] {
    return this.categoriesColors
      .filter((a) =>
        a.order < 5 || a.order === 9);
  }
}
