import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Board } from 'src/app/domain/models/board.model';

@Injectable({
	providedIn: 'root'
})
export class BoardService {

	constructor(
		private afs : AngularFirestore
	) { }

	/**
	 * Create a new board on data base
	 * @param boardData Board model
	 * @returns Insert a new board on data base
	 */
	createBoard(boardData : Board){
		const newBoard = this.afs.collection('boards');
		return newBoard.doc(this.afs.createId()).set(boardData);
	}

	/**
	 * Display a list of boards
	 * @returns All the boards on data base
	 */
	getBoardsList<Board>(){
		const boardList = this.afs.collection<Board>('boards');
		return boardList.valueChanges({ idField : 'id' });
	}
}
