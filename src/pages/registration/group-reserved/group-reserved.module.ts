import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupReserved } from './group-reserved';

@NgModule({
    declarations: [
        GroupReserved
    ],
    imports: [
        IonicPageModule.forChild(GroupReserved )
    ],
    entryComponents : [
        GroupReserved
    ]
})

export class GroupReservedModule {}