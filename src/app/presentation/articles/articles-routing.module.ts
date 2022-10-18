import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './pages/articles/articles.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';

const routes: Routes = [
	{
		path : '',
		children : [
			{
				path : ':channelName/posts',
				component : ArticlesComponent
			},
			{
				path : 'create-post',
				component : CreatePostComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArticlesRoutingModule { }
