import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Channel } from 'src/app/domain/models/channel';

@Injectable({
	providedIn: 'root'
})
export class ChannelService {

	constructor(private http: HttpClient) { }

	createChannel(channelName: string, channelDescription: string, parentBoard: string){
		const channelData: Channel = {
			channelName: channelName,
			channelDescription: channelDescription,
			parentBoard: parentBoard
		}

		console.log(channelData);

		this.http.post<{ name: string }>(
			'https://atos-community-upgrade-default-rtdb.firebaseio.com/'+ channelName +'.json',
			channelData
		)
	}
}
