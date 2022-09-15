import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './presentation/components/landing-page/landing-page.component';
import { HeaderComponent } from './presentation/components/header/header.component';
import { LoginComponent } from './presentation/components/login/login.component';

@NgModule({
	declarations: [
		AppComponent,
  		LandingPageComponent,
    HeaderComponent,
    LoginComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
