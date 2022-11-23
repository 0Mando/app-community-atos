import { Channel } from 'src/app/domain/models/channel.model';
import { Observable, Subject } from 'rxjs';
import { Board } from 'src/app/domain/models/board.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardCRUDService {

  private room$ = new Subject<any>();

  parentBoards: any[] = [];

  constructor(private firebase: AngularFirestore) { }

  createRoom(room: Board | Channel, roomType: string): Promise<any>{
    return this.firebase.collection(roomType).add(room);
  }

  readRoom(roomType: string): Observable<any>{
    return this.firebase.collection(roomType).snapshotChanges();
  }

  updateRoom(id: string, room: any, roomType: string): Promise<any>{
    return this.firebase.collection(roomType).doc(id).update(room);
  }

  addRoomEdit(board: Board | Channel){
    this.room$.next(board);
  }

  getBoardEdit(): Observable<Board>{
    return this.room$.asObservable();
  }

  getChannelEdit(): Observable<Channel>{
    return this.room$.asObservable();
  }

  deleteRoom(id: string, roomType: string): Promise<any> {
    return this.firebase.collection(roomType).doc(id).delete();
  }
}
