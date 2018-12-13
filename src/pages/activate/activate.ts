import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'activate',
  templateUrl: './activate.html'
})

export class ActivatePage {
  constructor(public translate: TranslateService) {
    
  }
}
