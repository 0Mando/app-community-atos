import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './presentation/components/landing-page/landing-page.component';
import { HeaderComponent } from './presentation/components/header/header.component';
import { LoginComponent } from './presentation/components/login/login.component';
import { BoardsComponent } from './presentation/components/boards/boards.component';
import { ChannelsComponent } from './presentation/components/channels/channels.component';
import { ProfileComponent } from './presentation/components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './presentation/components/register/register.component';
import { ArticlesComponent } from './presentation/components/articles/articles.component';
import { CardArticleItemComponent } from './presentation/components/articles/card-article-item/card-article-item.component';
import { LoadingSpinnerComponent } from './presentation/shared/loading-spinner/loading-spinner.component';
import { ChannelComponent } from './presentation/components/channel/channel.component';
import { FormatUrlPipe } from './infrastructure/pipes/format-url.pipe';
import { BoardComponent } from './presentation/admin/board/board.component';
import { FormBoardComponent } from './presentation/admin/board/form-board/form-board.component';
import { AdminChannelComponent } from './presentation/admin/admin-channel/admin-channel.component';
import { FormChannelComponent } from './presentation/admin/admin-channel/form-channel/form-channel.component';

@NgModule({
	declarations: [
		AppComponent,
		LandingPageComponent,
		HeaderComponent,
		LoginComponent,
		BoardsComponent,
		ChannelsComponent,
		RegisterComponent,
		ArticlesComponent,
		CardArticleItemComponent,
		ProfileComponent,
		LoadingSpinnerComponent,
		ChannelComponent,
		FormatUrlPipe,
		BoardComponent,
		FormBoardComponent,
  AdminChannelComponent,
  FormChannelComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
