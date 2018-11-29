import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TermsModalPage } from './terms';

@NgModule({
  declarations: [
    TermsModalPage,
  ],
  imports: [
    IonicPageModule.forChild(TermsModalPage),
  ],
})
export class ModalPageModule {}
