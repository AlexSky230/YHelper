import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer} from '@angular/platform-browser';

@Pipe({
  name: 'safeLink'
})
export class SafeLinkPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {}

  transform(url: string): any {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}
