import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
  selector: 'registration',
  templateUrl: './welcome.html'
})

export class WelcomePage {
  constructor(public translate: TranslateService) {
    
  }
}
