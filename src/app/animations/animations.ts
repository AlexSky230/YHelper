import {animate, state, style, transition, trigger} from '@angular/animations';

export let slide = trigger('slideOut', [
  state('void', style({height: '0'})),
  transition('void <=> *', [
    animate(150)
  ]),
]);

export let slideComponentRight = trigger('slideComponentRight', [
  state('void', style({marginLeft: ('-100%')}
    )),
  transition('void => *', [
    animate(250)
  ]),
]);

export let slideOut = trigger('slideOut', [
  state('void', style({width: ('0')})),
  transition('* => void', [
    animate(400)
  ])
]);
