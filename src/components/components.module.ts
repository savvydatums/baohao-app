import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { HeaderComponent } from './header/header';
import { SearchBarComponent } from './search-bar/search-bar';
import { SideMenuComponent } from './side-menu/side-menu';

@NgModule({
	declarations: [HeaderComponent,
		SearchBarComponent,
		SideMenuComponent],
	imports: [IonicModule],
	exports: [HeaderComponent,
		SearchBarComponent,
		SideMenuComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
