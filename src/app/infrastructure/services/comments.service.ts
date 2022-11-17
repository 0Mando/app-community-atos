import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IComment } from 'src/app/domain/models/icomment';


@Injectable({
	providedIn: 'root'
})
export class CommentsService {

	constructor(private afs : AngularFirestore) { }

	/**
	 * Create a new comment and storage on Firestore
	 * @param commentData Type of IComment interface object
	 * @returns A new document on Firestore
	 */
	createComment(commentData : IComment) {
		console.log('Creating a comment');
		const newComment = this.afs.collection('comments');
		return newComment.doc(this.afs.createId()).set(commentData);
	}

	/**
	 * Display all the comments of a single article page.
	 * @param idPost Reference of the article ID
	 * @returns
	 */
	displayComments<IComment>(idPost: string) {
		const comments = this.afs.collection<IComment>(
			'comments',
			ref => ref.where('idPost', '==', idPost)
		);
		return comments.valueChanges({ idField : 'id' });
	}

	deleteComment(idComment : string){
		return this.afs.collection('comments').doc(idComment).delete();
	}

	updateComment(idComment : string) {

	}
}
