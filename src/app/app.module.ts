//* Default Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';
// import * as Notiflix from 'notiflix';

//* Angular Firebase Set up
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

//* NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';

//* Pipes
import { FirstwordPipe } from './infrastructure/pipes/firstword.pipe';
import { SearchFilterPipe } from './infrastructure/pipes/search-filter.pipe';
import { ShortStringPipe } from './infrastructure/pipes/short-string.pipe';
import { FormatUrlPipe } from './infrastructure/pipes/format-url.pipe';

//* Components
import { LandingPageComponent } from './community/components/landing-page/landing-page.component';
import { HeaderComponent } from './community/components/header/header.component';
import { LoginComponent } from './community/components/login/login.component';
import { BoardsComponent } from './community/components/boards/boards.component';
import { ChannelsComponent } from './community/components/channels/channels.component';
import { ProfileComponent } from './community/components/profile/profile.component';
import { MyprofileComponent } from './community/components/myprofile/myprofile.component';
import { RegisterComponent } from './community/components/register/register.component';
import { ArticlesComponent } from './community/components/articles/articles.component';
import { CardArticleItemComponent } from './community/components/articles/card-article-item/card-article-item.component';
import { LoadingSpinnerComponent } from './community/shared/loading-spinner/loading-spinner.component';
import { AdminBoardFormComponent } from './community/admin/admin-board-form/admin-board-form.component';
import { AdminChannelFormComponent } from './community/admin/admin-channel-form/admin-channel-form.component';
import { ErrorComponent } from './community/components/error/error.component';
import { ChannelsEmptyComponent } from './presentation/shared/channels-empty/channels-empty.component';
import { ChannelsListComponent } from './presentation/components/channels/channels-list/channels-list.component';
import { ArticlesListComponent } from './presentation/components/channels/articles-list/articles-list.component';

@NgModule({
	declarations: [
		AppComponent,
		LandingPageComponent,
		HeaderComponent,
		LoginComponent,
		BoardsComponent,
		ChannelsComponent,
		ProfileComponent,
		MyprofileComponent,
		FirstwordPipe,
		RegisterComponent,
		ArticlesComponent,
		CardArticleItemComponent,
		LoadingSpinnerComponent,
		FormatUrlPipe,
		AdminBoardFormComponent,
		AdminChannelFormComponent,
		SearchFilterPipe,
		ChannelsEmptyComponent,
		ChannelsListComponent,
		ArticlesListComponent,
		ShortStringPipe,
		ErrorComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		AngularFireAuthModule,
		AngularFirestoreModule,
		provideStorage(() => getStorage()),
		
		//* NGX Pagination
		NgxPaginationModule,
		
		//* Admin
		AdminModule,

		//* Routing
		AppRoutingModule,

		
	],
	providers: [
		AngularFirestore,
		{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
