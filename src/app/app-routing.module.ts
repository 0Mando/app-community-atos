import { MyprofileComponent } from './community/components/myprofile/myprofile.component';
import { ProfileComponent } from './community/components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './community/components/channels/channels.component';
import { BoardsComponent } from './community/components/boards/boards.component';
import { LandingPageComponent } from './community/components/landing-page/landing-page.component';
import { LoginComponent } from './community/components/login/login.component';
import { RegisterComponent } from './community/components/register/register.component';
import { AdminBoardFormComponent } from './community/admin/admin-board-form/admin-board-form.component';
import { AdminChannelFormComponent } from './community/admin/admin-channel-form/admin-channel-form.component';
import { ErrorComponent } from './community/components/error/error.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { ChannelsEmptyComponent } from './community/shared/channels-empty/channels-empty.component';
import { ListArticlesComponent } from './community/components/article/pages/list-articles/list-articles.component';
import { CreateArticleComponent } from './community/components/article/pages/create-article/create-article.component';
import { ArticlePageComponent } from './community/components/article/pages/article-page/article-page.component';
import { ArticleGuard } from './infrastructure/guards/article.guard';
import { ArticleGuardService } from './infrastructure/services/article-guard.service';

const routes: Routes = [
	{
		path: '',
		component: LandingPageComponent
	},
	{
		path: 'sign-in',
		component: LoginComponent
	},
	{
		path: 'boards',
		component: BoardsComponent
	},
	{
		path: 'channels/:boardId',
		component: ChannelsComponent
	},
	{
		path : 'not-available-articles',
		component: ChannelsEmptyComponent
	},
	{
		path: 'profile',
		component: ProfileComponent
	},
	{
		path: 'myprofile',
		component: MyprofileComponent
  },
	{
		path : 'articles/:channelId/posts',
		component : ListArticlesComponent
	},
	{
		path : 'create-article',
		canActivate : [ArticleGuard],
		canDeactivate : [ArticleGuardService],
		component : CreateArticleComponent
	},
	{
		path : 'article/:id',
		component : ArticlePageComponent
	},
	{
		path: 'sign-up',
		component: RegisterComponent
	},
	{
		path : 'admin/boards',
		component : AdminBoardFormComponent
	},
	{
		path : 'admin/reports',
		component : ReportsComponent
	},
	{
		path: 'admin/channels',
		component : AdminChannelFormComponent
	},
	{
		path: 'page-not-found',
		component: ErrorComponent
	},
	{
		path: '**',
		pathMatch: 'full',
		redirectTo: '/page-not-found'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
