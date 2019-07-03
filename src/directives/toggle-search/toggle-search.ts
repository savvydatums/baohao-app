import { Directive } from '@angular/core';


@Directive({
  selector: '[toggle-search]' // Attribute selector
})
export class ToggleSearchDirective {

  constructor() {
    console.log('Hello ToggleSearchDirective Directive');
  }

  // try first, when toggle is on, category disappear

}
