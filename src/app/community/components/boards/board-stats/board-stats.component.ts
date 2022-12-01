import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/domain/models/board.model';
import { Channel } from 'src/app/domain/models/channel.model';
import { IArticle } from 'src/app/domain/models/ipost';
import { ArticleService } from 'src/app/infrastructure/services/article.service';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';

@Component({
	selector: 'app-board-stats',
	templateUrl: './board-stats.component.html',
	styleUrls: ['./board-stats.component.scss']
})
export class BoardStatsComponent implements OnInit {
	@Input() boardId: string;
	totalChannels: number = 0;
	channels: Channel[] = [];
	totalArticles: number = 0;
	articles: IArticle[] = [];
	recentArticle: string = 'No recent post';

	constructor(
		private channelService: ChannelService,
		private articleService: ArticleService
	) { }

	ngOnInit(): void {
		this.onFetchCountChannels(this.boardId);
		this.onFetchCountArticles(this.boardId);
	}

	onFetchCountChannels(boardId) {
		this.channelService.displayChannelsOfParenBoard<Board>(boardId).subscribe(
			(channel) => {
				this.channels = channel;
				this.totalChannels = this.channels.length
			}
		)
	}

	onFetchCountArticles(boardId) {
		this.articleService.fetchPostFromParentBoard<IArticle>(boardId).subscribe(
			(article) =>{
				this.articles = article;
				this.totalArticles = this.articles.length;
				this.articles.forEach(e =>{
					this.recentArticle = e.titlePost;
				})
			}
		)
	}
}
