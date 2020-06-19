import {animate, state, style, transition, trigger} from '@angular/animations';

export let slide = trigger('slideOut', [
  state('void', style({marginBottom: '-6em'})),
  transition('void => *', [
    animate(50)
  ]),
]);

export let slideComponentRight = trigger('slideComponentRight', [
  state('void', style({translateX: ('-100%')})),
  transition('void => *', [
    animate(50)
  ]),
]);
