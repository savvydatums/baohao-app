import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StepsPage } from './steps';

@NgModule({
    declarations: [StepsPage],
    imports: [
        IonicPageModule.forChild(StepsPage)
    ],
    entryComponents: [StepsPage]
})

export class StepsModule{}