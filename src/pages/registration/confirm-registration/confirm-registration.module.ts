import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmRegistrationPage } from './confirm-registration';

@NgModule({
    declarations: [
        ConfirmRegistrationPage
    ],
    imports: [
        IonicPageModule.forChild(ConfirmRegistrationPage)
    ],
    entryComponents : [
        ConfirmRegistrationPage
    ]
})

export class ConfirmRegistrationModule {}