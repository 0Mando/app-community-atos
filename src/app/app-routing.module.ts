import { MyprofileComponent } from './presentation/components/myprofile/myprofile.component';
import { ProfileComponent } from './presentation/components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChannelsComponent } from './presentation/components/channels/channels.component';
import { BoardsComponent } from './presentation/components/boards/boards.component';
import { LandingPageComponent } from './presentation/components/landing-page/landing-page.component';
import { LoginComponent } from './presentation/components/login/login.component';

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
		path: 'channels',
		component: ChannelsComponent
	},
	{
		path: 'profile',
		component: ProfileComponent
	},
	{
		path: 'myprofile',
		component: MyprofileComponent
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
