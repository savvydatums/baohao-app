import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsightDetailsPage } from './insight-details';

@NgModule({
  declarations: [
    InsightDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(InsightDetailsPage),
  ],
})
export class InsightDetailsPageModule {}
