import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Board } from 'src/app/domain/models/board.model';

@Injectable({
	providedIn: 'root'
})
export class BoardService {

	constructor(private firestore: Firestore) { }

	createBoard(board: Board) {
		const boardRef = collection(this.firestore, 'boards');
		return addDoc(boardRef, board);
	}

	fetchBoards(): Observable<Board[]> {
		const boardRef = collection(this.firestore, 'boards');
		return collectionData(boardRef, { idField: 'id' }) as Observable<Board[]>;
	}

	deleteBoard(board: Board) {
		const boardDocRef = doc(this.firestore, `boards/${board.id}`);
		return deleteDoc(boardDocRef);
	}

}
