import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Channel } from 'src/app/domain/models/channel';


@Component({
	selector: 'app-channel',
	templateUrl: './channel.component.html',
	styleUrls: ['./channel.component.scss']
})
export class ChannelComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	channels: Channel[];

	channel : {
		boardName: string
	}

	ngOnInit(): void {
		// this.route.paramMap.subscribe(params =>{
		// 	if(params.has("channel-name")){
		// 		console.log("-----Channel-----");
		// 		console.log(params.get("channel-name"));
		// 	}
		// })

		this.channel = {
			boardName : this.route.snapshot.params['channel-name']
		}

		this.route.params.subscribe(
			(params: Params)=>{
				this.channel.boardName = params['channel-name'];
			}
		)

	}

}
