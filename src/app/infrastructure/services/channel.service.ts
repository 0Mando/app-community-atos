import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Channel } from 'src/app/domain/models/channel.model';

@Injectable({
	providedIn: 'root'
})
export class ChannelService {

	channelRoute = new BehaviorSubject('');

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
		return collection.valueChanges({ idField : 'id' });
	}

	getChannelById(idChannel : string) {
		return this.afs.collection('channels').doc(idChannel).valueChanges();
	}

	readChannels(): Observable<any>{
		return this.afs.collection('channels').snapshotChanges();
	}

	readPopularChannels(parentId: string){
		return this.afs.collection('channels', ref => ref.where('parentBoard', '==', parentId)).get();
	}

	updateChannel(id: string, num: number): Promise<any>{
		return this.afs.collection("channels").doc(id).update({articles: num});
	}

	// channelExists(parentBoard : string) {
	// 	const collection = this.afs.collection<Channel>(
	// 		'channels',
	// 		ref => ref.where('parentBoard', '==', parentBoard)
	// 	)
	// 	console.log(collection.valueChanges());
	// }
}
