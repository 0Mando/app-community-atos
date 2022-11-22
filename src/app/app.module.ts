//* Default Modules
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminModule } from './admin/admin.module';


//* Angular Firebase Set up
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
// import { AngularFireModule } from '@angular/fire/compat';
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
// import { ShortenModPipe } from './infrastructure/pipes/shorten-mod.pipe';
// import { TimeAgoPipe } from './infrastructure/pipes/time-ago.pipe';

//* Components
import { LandingPageComponent } from './community/components/landing-page/landing-page.component';
import { HeaderComponent } from './community/components/header/header.component';
import { LoginComponent } from './community/components/login/login.component';
import { BoardsComponent } from './community/components/boards/boards.component';
import { ChannelsComponent } from './community/components/channels/channels.component';
import { ProfileComponent } from './community/components/profile/profile.component';
import { MyprofileComponent } from './community/components/myprofile/myprofile.component';
import { RegisterComponent } from './community/components/register/register.component';
import { LoadingSpinnerComponent } from './community/shared/loading-spinner/loading-spinner.component';
import { AdminBoardFormComponent } from './community/admin/admin-board-form/admin-board-form.component';
import { AdminChannelFormComponent } from './community/admin/admin-channel-form/admin-channel-form.component';
import { ErrorComponent } from './community/components/error/error.component';
import { ChannelsEmptyComponent } from './community/shared/channels-empty/channels-empty.component';
import { ChannelsListComponent } from './community/components/channels/channels-list/channels-list.component';
import { ChannelArticlesListComponent } from './community/components/channels/articles-list/articles-list.component';

//* Articles
import { ListArticlesComponent } from './community/components/article/pages/list-articles/list-articles.component';
import { CreateArticleComponent } from './community/components/article/pages/create-article/create-article.component';
import { ArticlePageComponent } from './community/components/article/pages/article-page/article-page.component';
import { ArticleCardComponent } from './community/components/article/components/article-card/article-card.component';
import { TopSpeakersComponent } from './community/components/article/components/top-speakers/top-speakers.component';
import { LikesComponent } from './community/components/article/components/likes/likes.component';
import { TabComponent } from './community/components/article/components/tab/tab.component';
import { TabsComponent } from './community/components/article/components/tabs/tabs.component';
import { QuillModule } from 'ngx-quill';
import { CommentCardComponent } from './community/components/comments/comment-card/comment-card.component';
import { CommentFormComponent } from './community/components/comments/comment-form/comment-form.component';
import { ListCommentsComponent } from './community/components/comments/list-comments/list-comments.component';
import { ButtonActionsComponent } from './community/components/comments/button-actions/button-actions.component';
import { ButtonOptionsComponent } from './community/components/article/components/button-options/button-options.component';

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
		LoadingSpinnerComponent,
		FormatUrlPipe,
		AdminBoardFormComponent,
		AdminChannelFormComponent,
		SearchFilterPipe,
		ChannelsEmptyComponent,
		ChannelsListComponent,
		ChannelArticlesListComponent,
		ShortStringPipe,
		ErrorComponent,
		ListArticlesComponent,
		CreateArticleComponent,
		ArticlePageComponent,
		ArticleCardComponent,
		TopSpeakersComponent,
		LikesComponent,
		TabComponent,
		TabsComponent,
		CommentCardComponent,
		CommentFormComponent,
		ListCommentsComponent,
		ButtonActionsComponent,
  ButtonOptionsComponent,
		// ShortenModPipe,
		// TimeAgoPipe,
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,

		//* Angular Firebase Set up
		// AngularFireModule.initializeApp(environment.firebase),
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

		//* Quill Editor
		QuillModule.forRoot()
	],
	providers: [
		AngularFirestore,
		{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
