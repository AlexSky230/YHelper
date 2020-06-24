import {AfterContentChecked, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appInputAutofocus]'
})
export class InputAutofocusDirective implements AfterContentChecked {
  constructor(private element: ElementRef<HTMLInputElement>) {}

  ngAfterContentChecked(): void {
    this.element.nativeElement.focus();
  }
}
