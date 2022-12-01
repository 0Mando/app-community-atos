import { map, switchMap } from 'rxjs';
import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';


@Component({
	selector: 'app-channels',
	templateUrl: './channels.component.html',
	styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

	boardId: string;
	search: string;

	popularChannels = [];

	searchForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private _channelService : ChannelService,
		private fb: FormBuilder
	) {
		this.searchForm = this.fb.group({
			search: ''
		})
	 }

	ngOnInit(): void {
		// this.boardId = this.route.snapshot.params['boardId'];

		// this._channelService.readPopularChannels(this.boardId).subscribe(channels => {
		// 	this.popularChannels = [];
		// 	channels.docs.forEach((channel: any) => {
		// 		this.popularChannels.push({
		// 			id: channel.id,
		// 			...channel.data()
		// 		})
		// 	})

		// 	if(this.popularChannels.length > 4){
		// 		this.popularChannels.length = 4
		// 	}

		// 	this.popularChannels.sort((a: any,b: any) => b.articles - a.articles);		
		// });



		this.route.params.pipe(
			map((params: Params) => {
				this.boardId = params['boardId'];
				this._channelService.channelRoute.next(params['boardId']);
				return this.boardId
			}),
			switchMap(channel => this._channelService.readPopularChannels(channel).pipe(
				map(channels => {
					this.popularChannels = [];

					channels.docs.forEach((channel: any) => {
						this.popularChannels.push({
							id: channel.id,
							...channel.data()
						})
					})

					if(this.popularChannels.length > 4){
						this.popularChannels.length = 4
					}
		
					this.popularChannels.sort((a: any,b: any) => b.articles - a.articles);	
				})
			))
		).subscribe()
	}
}
