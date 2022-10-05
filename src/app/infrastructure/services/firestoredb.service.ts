import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Board } from 'src/app/domain/models/board.model';

@Injectable({
	providedIn: 'root'
})
export class FirestoredbService {

	constructor(private afs: AngularFirestore) { }

	createDocument(data: any, path: string, id: string){
		const collection = this.afs.collection(path);
		return collection.doc(id).set(data);
	}
}
