import { Observable, Subject } from 'rxjs';
import { Board } from './../../domain/models/board.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardCRUDService {

  private board$ = new Subject<any>();

  constructor(private firebase: AngularFirestore) { }

  createBoard(board: Board): Promise<any>{
    return this.firebase.collection('boards').add(board);
  }

  readBoard(): Observable<any>{
    return this.firebase.collection('boards').snapshotChanges();
  }

  updateBoard(id: string, board: any): Promise<any>{
    return this.firebase.collection('boards').doc(id).update(board);
  }

  addBoardEdit(board: Board){
    this.board$.next(board);
  }

  getBoardEdit(): Observable<Board>{
    return this.board$.asObservable();
  }

  deleteBoard(id: string): Promise<any> {
    return this.firebase.collection('boards').doc(id).delete();
  }
}
