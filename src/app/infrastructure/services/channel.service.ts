import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Channel } from 'src/app/domain/models/channel.model';

@Injectable({
	providedIn: 'root'
})
export class ChannelService {

	constructor(private http: HttpClient) { }

	createChannel(channelName: string, channelDescription: string, channelImage: string, parentBoard: string){
		const channelData: Channel = {
			channelName: channelName,
			channelDescription: channelDescription,
			channelImage: channelImage,
			parentBoard: parentBoard
		}

		this.http.post<{ name: string }>(
			'https://atos-community-upgrade-default-rtdb.firebaseio.com/'+ parentBoard + '.json',
			channelData
		).subscribe(
			responseData =>{
				console.log(responseData);
			}
		)
	}

	fetchChannel(parentBoard : string){
		return this.http.get<{ [key:string]: Channel }>(
			'https://atos-community-upgrade-default-rtdb.firebaseio.com/'+ parentBoard + '.json',
		).pipe(
			map(
				response =>{
					const channelsArray: Channel[] = [];
					for(const key in response){
						if(response.hasOwnProperty(key)){
							channelsArray.push({...response[key], id: key})
						}
					}
					return channelsArray;
				}
			)
		);
	}
}
