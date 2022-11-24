import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscribable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BoardCRUDService } from '../services/board-crud.service';

@Pipe({
  name: 'parentBoards'
})
export class ParentBoardsPipe implements PipeTransform {
  
  name: string;

  constructor(private _boardService: BoardCRUDService){}

  transform(value: any): Observable<string> | Subscribable<string> | Promise<string> {
    return this._boardService.readRoom('boards').pipe(
      map(boards => {
        let name: string;
        boards.forEach(board => {
          if(value == board.payload.doc.id){
            name = board.payload.doc.data().boardName;
          }
        })
        return name;
      })
    );
  }
}
