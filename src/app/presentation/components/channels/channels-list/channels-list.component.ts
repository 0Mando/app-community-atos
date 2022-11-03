import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Channel } from 'src/app/domain/models/channel.model';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';

@Component({
	selector: 'app-channels-list',
	templateUrl: './channels-list.component.html',
	styleUrls: ['./channels-list.component.scss']
})
export class ChannelsListComponent implements OnInit {

	channels: Channel[];

	//* Pagination stuff
	channelsLength : number;
	pageChannel : number = 1;

	@Input() boardName : string;

	constructor(
		private channelService : ChannelService,
		private router : Router,
	) { }

	ngOnInit(): void {
		this.fetchChannels();
	}

	private fetchChannels() {
		this.channelService.displayChannelsOfParenBoard<Channel>(this.boardName).subscribe(
			channels =>{
				this.channels = channels;
				this.channelsLength = this.channels.length;
				console.log(this.channels);
				if(this.channels.length === 0) {
					this.router.navigate(['not-available-articles']);
				}
			}
		)
	}
}
