import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/app/domain/models/channel.model';

@Injectable({
	providedIn: 'root'
})
export class ChannelService {

	constructor(
		private afs : AngularFirestore
	) { }

	/**
	 * Create a new channel on data base
	 * @param channelData Channel model
	 * @returns Insert a new channel on data base
	 */
	createChannel(channelData : Channel){
		console.log('Creating channel...');
		const newChannel = this.afs.collection('channels');
		return newChannel.doc(this.afs.createId()).set(channelData);
	}

	displayChannelsOfParenBoard<Channel>(parentBoard : string){
		const collection = this.afs.collection<Channel>(
			'channels',
			ref => ref.where('parentBoard', '==', parentBoard)
		)
		return collection.valueChanges();
	}

	// channelExists(parentBoard : string) {
	// 	const collection = this.afs.collection<Channel>(
	// 		'channels',
	// 		ref => ref.where('parentBoard', '==', parentBoard)
	// 	)
	// 	console.log(collection.valueChanges());
	// }
}
