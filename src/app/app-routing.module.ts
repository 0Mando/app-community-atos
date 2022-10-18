import { MyprofileComponent } from './presentation/components/myprofile/myprofile.component';
import { ProfileComponent } from './presentation/components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './presentation/components/channels/channels.component';
import { BoardsComponent } from './presentation/components/boards/boards.component';
import { LandingPageComponent } from './presentation/components/landing-page/landing-page.component';
import { LoginComponent } from './presentation/components/login/login.component';
import { ArticlesComponent } from './presentation/components/articles/articles.component';
import { RegisterComponent } from './presentation/components/register/register.component';
import { AdminBoardFormComponent } from './presentation/admin/admin-board-form/admin-board-form.component';
import { AdminChannelFormComponent } from './presentation/admin/admin-channel-form/admin-channel-form.component';


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
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
