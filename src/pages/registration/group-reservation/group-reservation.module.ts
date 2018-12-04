import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import {GroupReservation} from './group-reservation';

@NgModule({
    declarations: [
        GroupReservation
    ],
    imports: [
        IonicPageModule.forChild(GroupReservation)
    ],
    entryComponents : [
        GroupReservation
    ]
})

export class GroupReservationModule {}