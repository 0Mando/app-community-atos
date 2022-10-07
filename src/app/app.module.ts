import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './presentation/components/landing-page/landing-page.component';
import { HeaderComponent } from './presentation/components/header/header.component';
import { LoginComponent } from './presentation/components/login/login.component';
import { BoardsComponent } from './presentation/components/boards/boards.component';
import { CardBoardItemComponent } from './presentation/components/boards/card-board-item/card-board-item.component';
import { ChannelsComponent } from './presentation/components/channels/channels.component';
import { ProfileComponent } from './presentation/components/profile/profile.component';
import { MyprofileComponent } from './presentation/components/myprofile/myprofile.component';
import { AngularFireModule } from '@angular/fire/compat';
import { FirstwordPipe } from './presentation/pipes/firstword.pipe';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
	declarations: [
		AppComponent,
  		LandingPageComponent,
		HeaderComponent,
		LoginComponent,
		BoardsComponent,
		CardBoardItemComponent,
		ChannelsComponent,
		ProfileComponent,
		MyprofileComponent,
		FirstwordPipe,
		
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		ReactiveFormsModule,
		// provideFirebaseApp(() => initializeApp(environment.firebase)),
		// provideFirestore(() => getFirestore()),
		AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
		NgxPaginationModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
