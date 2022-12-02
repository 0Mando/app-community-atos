import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { arrayRemove, arrayUnion } from 'firebase/firestore';
import { IArticle } from 'src/app/domain/models/ipost';


@Injectable({
	providedIn: 'root'
})
export class ArticleService {

	constructor(private afs: AngularFirestore) { }

	/**
	 * Create a new post and storage on db
	 * @param postData Information of the post
	 * @returns A new document on Firebase.
	 */
	createPost(postData: IArticle) {
		const newPost = this.afs.collection('posts');
		return newPost.doc(this.afs.createId()).set(postData);
	}

	/**
	 * Shows available articles that are not archived.
	 * @param channelId Origin channel reference.
	 * @returns Articles list.
	 */
	displayPost<IArticle>(channelId: string) {
		const post = this.afs.collection<IArticle>(
			'posts',
			(ref) => ref
				.where('channelId', '==', channelId)
				.where('archive', '==', false)
				.orderBy('date','desc')
		)
		return post.valueChanges({ idField: 'id' });
	}

	// TODO: Recuperar artículo por ID
	getArticleById<IArticle>(articleId: string) {
		return this.afs.collection<IArticle>('posts').doc(articleId).valueChanges();
	}

	/**
	 * Update the content of an article.
	 * @param articleId Article reference.
	 * @param title Article title.
	 * @param desc Article description.
	 * @param time Article time to read.
	 * @param content Article content body.
	 * @param comments Enable or not comments.
	 * @param archive Is it archived or not
	 * @returns Update the content in firebase.
	 */
	updatePost(articleId: string, title: string, desc: string, time: number,
		content: string, comments: boolean, archive: boolean) {
		return this.afs.collection('posts').doc(articleId).update(
			{
				titlePost: title,
				descriptionContent: desc,
				readingTime: time,
				content: content,
				disableComments: comments,
				archive: archive
			}
		);
	}

	deletePost(articleId: string) {
		return this.afs.collection('posts').doc(articleId).delete();
	}

	fetchPostFromParentBoard<IArticle>(boardId: string) {
		const postsCollection = this.afs.collection<IArticle>(
			'posts',
			(ref) => ref
				.where('boardId', '==', boardId)
				.where('archive', '==', false)
		);
		return postsCollection.valueChanges({ idField: 'id' });
	}

	// TODO : Recuperar el ID del post en el servicio
	getUserArticles(id: string, status: boolean) {
		return this.afs.collection('posts', ref => ref.where("userCreatedId", "==", id).where('archive', "==", status)).get();
	}

	addLike(articleId: string, userId: string) {
		return this.afs.collection('posts').doc(articleId).update(
			{ likes: arrayUnion(userId) }
		)
	}

	removeLike(articleId: string, userId: string) {
		return this.afs.collection('posts').doc(articleId).update(
			{ likes: arrayRemove(userId) }
		)
	}

	getComments(articleId: string, comments: number) {
		return this.afs.collection('posts').doc(articleId).update(
			{ comments: comments }
		)
	}

	counterViews(articleId: string, views: number) {
		return this.afs.collection('posts').doc(articleId).update(
			{ views: views+1 }
		)
	}

	onFetchUserArticles<IArticle>(userId: string) {
		const postsCollection = this.afs.collection<IArticle>(
			'posts',
			(ref) => ref
				.where('userCreatedId', '==', userId)
				.where('archive', '==', false)
		);
		return postsCollection.valueChanges({ idField: 'id' });
	}

	readPosts(){
		return this.afs.collection('posts').snapshotChanges();
	}
}
