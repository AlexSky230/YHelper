import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'shortcutTitle'
})
export class ShortcutTitlePipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 50) {
      value = value.slice(0, 50) + '...';
    }
    return value;
  }
}
