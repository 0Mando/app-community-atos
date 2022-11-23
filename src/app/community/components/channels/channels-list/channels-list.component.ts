import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Channel } from 'src/app/domain/models/channel.model';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';

@Component({
	selector: 'app-channels-list',
	templateUrl: './channels-list.component.html',
	styleUrls: ['./channels-list.component.scss']
})
export class ChannelsListComponent implements OnInit {

	channels: Channel[];
	parentBoard : string;
	//* Pagination stuff
	channelsLength : number;
	pageChannel : number = 1;

	@Input() boardId : string;

	constructor(
		private channelService : ChannelService,
		private router : Router,
	) { }

	ngOnInit(): void {
		this.fetchChannels();
	}

	private fetchChannels() {
		this.channelService.displayChannelsOfParenBoard<Channel>(this.boardId).subscribe(
			channels =>{
				this.channels = channels;
				this.channelsLength = this.channels.length;
				if(this.channels.length === 0) {
					this.router.navigate(['not-available-articles']);
				}
			}
		)
	}
}
