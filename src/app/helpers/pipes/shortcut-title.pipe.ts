import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortcutTitle'
})
export class ShortcutTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      let filteredString = value
        .replace(/^https?\:\/\//i, '')
        .replace(/\/.*/gi, '');
      if (filteredString.length > 25) {
        filteredString = filteredString.slice(0, 15) + '...';
      }
      return filteredString;
    }
  }
}
