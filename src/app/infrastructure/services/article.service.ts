import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { IArticle } from 'src/app/domain/models/ipost';


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
	createPost(postData : IArticle) {
		console.log('Creating post');
		const newPost = this.afs.collection('posts');
		return newPost.doc(this.afs.createId()).set(postData);
	}

	displayPost<IPost>(channelId : string) {
		const post = this.afs.collection<IPost>(
			'posts',
			ref => ref.where('channelId', '==', channelId)
		)
		return post.valueChanges({ idField : 'id' });
	}

	// TODO: Recuperar artículo por ID
	getArticleById<IPost>(articleId : string) {
		return this.afs.collection<IPost>('posts').doc(articleId).valueChanges();
	}

	updatePost(articleId : string, title : string, desc : string, time : number,
		content : string, comments : boolean, archive : boolean) {
		return this.afs.collection('posts').doc(articleId).update(
			{
				titlePost : title,
				descriptionContent : desc,
				readingTime : time,
				content : content,
				disableComments : comments,
				archive : archive
			}
		);
	}

	deletePost(articleId : string) {
		return this.afs.collection('posts').doc(articleId).delete();
	}

	fetchPostFromParentBoard<IPost>(boardParent : string) {
		const postsCollection = this.afs.collection<IPost>(
			'posts',
			ref => ref
				.where('boardParent','==', boardParent)
		);
		return postsCollection.valueChanges({ idField : 'id' });
	}
}
