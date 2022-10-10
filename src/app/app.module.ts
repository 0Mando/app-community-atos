import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//* Angular Firebase Set up
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';

//* NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './presentation/components/landing-page/landing-page.component';
import { HeaderComponent } from './presentation/components/header/header.component';
import { LoginComponent } from './presentation/components/login/login.component';
import { BoardsComponent } from './presentation/components/boards/boards.component';
import { ChannelsComponent } from './presentation/components/channels/channels.component';
import { ProfileComponent } from './presentation/components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyprofileComponent } from './presentation/components/myprofile/myprofile.component';
import { FirstwordPipe } from './presentation/pipes/firstword.pipe';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './presentation/components/register/register.component';
import { ArticlesComponent } from './presentation/components/articles/articles.component';
import { CardArticleItemComponent } from './presentation/components/articles/card-article-item/card-article-item.component';
import { LoadingSpinnerComponent } from './presentation/shared/loading-spinner/loading-spinner.component';
import { FormatUrlPipe } from './infrastructure/pipes/format-url.pipe';
import { AdminBoardFormComponent } from './presentation/admin/admin-board-form/admin-board-form.component';
import { AdminChannelFormComponent } from './presentation/admin/admin-channel-form/admin-channel-form.component';
import { SearchFilterPipe } from './infrastructure/pipes/search-filter.pipe';

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
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		//* Angular Firebase Set up
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		//* NGX Pagination
		NgxPaginationModule
	],
	providers: [AngularFirestore],
	bootstrap: [AppComponent]
})
export class AppModule { }
