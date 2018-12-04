import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserDetailsPage } from './user-details';

@NgModule({
    declarations: [
        UserDetailsPage
    ],
    imports: [
        IonicPageModule.forChild(UserDetailsPage)
    ],
    entryComponents : [
        UserDetailsPage
    ]
})

export class UserDetailsModule{}