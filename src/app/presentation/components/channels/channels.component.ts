import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Channel } from 'src/app/domain/models/channel.model';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';
import { IPost } from '../../articles/model/ipost';
import { ArticleService } from '../../articles/services/article.service';


@Component({
	selector: 'app-channels',
	templateUrl: './channels.component.html',
	styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private channelService : ChannelService,
		private router : Router,
		private articlesService : ArticleService
	) { }

	channels: Channel[];
	posts : IPost[];

	//* Pagination stuff
	channelsLength : number;
	postsLength: number;
	pageChannel : number = 1;
	pagePost : number = 1;

	channel : {
		boardName: string
	}

	ngOnInit(): void {
		this.channel = {
			boardName : this.route.snapshot.params['boardName']
		}

		this.route.params.subscribe(
			(params: Params)=>{
				this.channel.boardName = params['boardName'];
			}
		)

		const boardName : string = this.channel.boardName;

		this.channelService.displayChannelsOfParenBoard<Channel>(boardName).subscribe(
			channels =>{
				this.channels = channels;
				this.channelsLength = this.channels.length;
				console.log(this.channels);
				if(this.channels.length === 0) {
					this.router.navigate(['not-available-articles']);
				}
			}
		)

		this.articlesService.getAllPosts<IPost>().subscribe(
			(posts)  => {
				this.posts = posts;
				this.postsLength = this.posts.length;
			}
		)
	}
}
