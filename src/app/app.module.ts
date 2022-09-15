import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './presentation/components/landing-page/landing-page.component';
import { HeaderComponent } from './presentation/components/header/header.component';
import { LoginComponent } from './presentation/components/login/login.component';
import { BoardsComponent } from './presentation/components/boards/boards.component';
import { CardBoardItemComponent } from './presentation/components/boards/card-board-item/card-board-item.component';

@NgModule({
	declarations: [
		AppComponent,
  		LandingPageComponent,
    HeaderComponent,
    LoginComponent,
    BoardsComponent,
    CardBoardItemComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
