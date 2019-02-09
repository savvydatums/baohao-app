import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from "ionic-angular";
import { HeaderComponent } from './header/header';

@NgModule({
	declarations: [HeaderComponent],
	imports: [IonicModule],
	exports: [HeaderComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ComponentsModule {}
