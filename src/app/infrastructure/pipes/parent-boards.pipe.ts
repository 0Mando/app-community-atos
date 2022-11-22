import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs/operators';
import { BoardCRUDService } from '../services/board-crud.service';

@Pipe({
  name: 'parentBoards'
})
export class ParentBoardsPipe implements PipeTransform {
  
  name: string;

  constructor(private _boardService: BoardCRUDService){}

  transform(value: any) {
    return this._boardService.readRoom('boards').pipe(
      map(boards => {
        let name: string = "Hola";
        // boards.forEach(board => {
        //   if(value == board.payload.doc.id){
        //     name = board.payload.doc.data().boardName;
        //   }
        // })
        return "Hola";
      })
    );
  }
}
