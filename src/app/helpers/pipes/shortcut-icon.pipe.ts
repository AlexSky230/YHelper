import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortcutIcon'
})
export class ShortcutIconPipe implements PipeTransform {

  transform(value: string): string {
    if (value) {
      return value
        .replace(/^https?\:\/\//gi, '')
        .slice(0, 4);
    }
  }
}
