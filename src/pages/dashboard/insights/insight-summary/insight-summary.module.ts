import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InsightSummaryPage } from './insight-summary';

@NgModule({
  declarations: [
    InsightSummaryPage,
  ],
  imports: [
    IonicPageModule.forChild(InsightSummaryPage),
  ],
})
export class InsightSummaryPageModule {}
