import { MyprofileComponent } from './community/components/myprofile/myprofile.component';
import { ProfileComponent } from './community/components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './community/components/channels/channels.component';
import { BoardsComponent } from './community/components/boards/boards.component';
import { LandingPageComponent } from './community/components/landing-page/landing-page.component';
import { LoginComponent } from './community/components/login/login.component';
import { ArticlesComponent } from './community/components/articles/articles.component';
import { RegisterComponent } from './community/components/register/register.component';
import { AdminBoardFormComponent } from './community/admin/admin-board-form/admin-board-form.component';
import { AdminChannelFormComponent } from './community/admin/admin-channel-form/admin-channel-form.component';
import { ErrorComponent } from './community/components/error/error.component';
import { ChannelsEmptyComponent } from './presentation/shared/channels-empty/channels-empty.component';


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
		path: 'channels/:boardName',
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
		path: 'articles',
		loadChildren : () => import('./presentation/articles/articles.module').then(m => m.ArticlesModule)
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
