import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { HeaderComponent } from './header/header';
import { SearchBarComponent } from './search-bar/search-bar';

@NgModule({
	declarations: [HeaderComponent,
    SearchBarComponent],
	imports: [IonicModule],
	exports: [HeaderComponent,
    SearchBarComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
