import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Channel } from 'src/app/domain/models/channel.model';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';

@Component({
	selector: 'app-channels',
	templateUrl: './channels.component.html',
	styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

	constructor(private route: ActivatedRoute, private channelService : ChannelService) { }

	channels: Channel[];

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

		this.channelService.fetchChannel(boardName).subscribe(
			channels => {
				this.channels = channels;
			}
		)

	}

}
