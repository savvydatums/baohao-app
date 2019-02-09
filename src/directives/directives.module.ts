import { NgModule } from '@angular/core';
import { TestTwoDirective } from './test-two/test-two';
import { ToggleSearchDirective } from './toggle-search/toggle-search';

@NgModule({
	declarations: [TestTwoDirective,
    ToggleSearchDirective],
	imports: [],
	exports: [TestTwoDirective,
    ToggleSearchDirective]
})
export class DirectivesModule {}
// TODO: create 2 directives
// one directive control keyboard shows and animate out when click search bar
// second directive control animation between two categories
//https : //blog.angularindepth.com/enhance-components-with-directives-58f16c4ca1f