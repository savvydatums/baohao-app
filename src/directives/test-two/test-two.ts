import { Directive } from '@angular/core';

/**
 * Generated class for the TestTwoDirective directive.
 *
 * See https://angular.io/api/core/Directive for more info on Angular
 * Directives.
 */
@Directive({
  selector: '[test-two]' // Attribute selector
})
export class TestTwoDirective {

  constructor() {
    console.log('Hello TestTwoDirective Directive');
  }

}
