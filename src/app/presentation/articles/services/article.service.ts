import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
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

	displayPost<IPost>(channelParent : string) {
		const post = this.afs.collection<IPost>(
			'posts',
			ref => ref.where('channelParent', '==', channelParent)
		)
		return post.valueChanges({ idField : 'id' });
	}

	// TODO: Recuperar artículo por ID
	getArticleById<IPost>(articleId : string) {
		return this.afs.collection<IPost>('posts').doc(articleId).valueChanges();
	}

	fetchPostFromParentBoard<IPost>(boardParent : string) {
		const postsCollection = this.afs.collection<IPost>(
			'posts',
			ref => ref
				.where('boardParent','==', boardParent)
		);
		return postsCollection.valueChanges();
	}
}
