import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';


@Component({
	selector: 'app-channels',
	templateUrl: './channels.component.html',
	styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

	boardId: string

	constructor(
		private route: ActivatedRoute,
		private _channelService : ChannelService
	) { }

	ngOnInit(): void {

		this.boardId = this.route.snapshot.params['boardId']

		this.route.params.subscribe(
			(params: Params)=>{
				this.boardId = params['boardId'];
				this._channelService.channelRoute.next(params['boardId']);
			}
		)
	}
}
