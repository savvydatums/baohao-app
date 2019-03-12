import { Component } from '@angular/core';
import { MenuController } from 'ionic-angular';

@Component({
  selector: 'side-menu',
  templateUrl: 'side-menu.html'
})
export class SideMenuComponent {

	constructor(private menu: MenuController) { }

	openMenu() {
		this.menu.enable(true, 'end');
		this.menu.open('end');
	}

}