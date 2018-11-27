import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SignupPage, Terms } from './signup';

@NgModule({
    declarations: [
        SignupPage,
        Terms
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
        Terms
    ],
    entryComponents : [
        SignupPage, Terms
    ],
    exports: [Terms]
})

export class SignupModule{}