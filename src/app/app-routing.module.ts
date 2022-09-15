import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
