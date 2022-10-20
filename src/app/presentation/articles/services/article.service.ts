import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IPost } from '../model/ipost';

@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	constructor(private afs : AngularFirestore) { }

	/**
	 * Create a new post and storage on db
	 * @param postData Information of the post
	 * @returns A new document on Firebase.
	 */
	createPost(postData : IPost) {
		console.log('Creating post');
		const newPost = this.afs.collection('posts');
		return newPost.doc(this.afs.createId()).set(postData);
	}
}
