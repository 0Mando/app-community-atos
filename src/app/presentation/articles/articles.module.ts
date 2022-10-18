import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { ArticlesComponent } from './pages/articles/articles.component';
import { TopSpeakersListComponent } from './components/top-speakers-list/top-speakers-list.component';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';

//* NGX Pagination
import { NgxPaginationModule } from 'ngx-pagination';

import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tab/tab.component';
import { CreatePostComponent } from './pages/create-post/create-post.component';
import { QuillModule } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		ArticlesComponent,
		TopSpeakersListComponent,
		ArticlesListComponent,
		TabsComponent,
		TabComponent,
		CreatePostComponent,
	],
	imports: [
		CommonModule,
		ArticlesRoutingModule,
		//* NGX Pagination
		NgxPaginationModule,
		QuillModule,
		ReactiveFormsModule
	]
})
export class ArticlesModule { }
