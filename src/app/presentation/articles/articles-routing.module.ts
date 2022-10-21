import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlePageComponent } from './pages/article-page/article-page.component';
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
			},
			{
				path : 'post/:id',
				component : ArticlePageComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ArticlesRoutingModule { }
