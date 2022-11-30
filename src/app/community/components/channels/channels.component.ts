import { Channel } from 'src/app/domain/models/channel.model';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
		this.popularChannels = [];

		this.boardId = this.route.snapshot.params['boardId'];

		this._channelService.readPopularChannels(this.boardId).subscribe(channels => {
			channels.docs.forEach((channel: any) => {
				this.popularChannels.push({
					id: channel.id,
					...channel.data()
				})
			})

			if(this.popularChannels.length > 4){
				this.popularChannels.length = 4
			}

			
			// channels.forEach(channel => {
			// 	this.popularChannels.push({
			// 		id: channel.payload.doc.id,
			// 		...channel.payload.doc.data()
			// 	});
			// });
			// this.popularChannels.length = 4;			
		});

		this.route.params.subscribe(
			(params: Params)=>{
				this.boardId = params['boardId'];
				this._channelService.channelRoute.next(params['boardId']);
			}
		)
	}
}
