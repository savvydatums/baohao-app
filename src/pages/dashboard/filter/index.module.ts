import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterPopoverPage } from '.';

@NgModule({
  declarations: [
    FilterPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterPopoverPage),
  ],
  entryComponents: [
		FilterPopoverPage
	]
})
export class FilterPopoverPageModule {}
