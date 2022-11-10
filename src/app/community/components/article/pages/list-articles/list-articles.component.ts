import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
	selector: 'app-list-articles',
	templateUrl: './list-articles.component.html',
	styleUrls: ['./list-articles.component.scss']
})
export class ListArticlesComponent implements OnInit {

	channelName : string = '';
	userIsLoggedIn : boolean;
	boardName : string = '';

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params : Params)=>{
				this.channelName = params['channelName']
				this.boardName = params['parentBoard']
			}
		)
	}

	onCreatePost() {
	}
}
