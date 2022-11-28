import { Pipe, PipeTransform } from '@angular/core';
import { Observable, Subscribable, map, switchMap } from 'rxjs';
import { BoardCRUDService } from '../services/board-crud.service';

@Pipe({
  name: 'parentName'
})
export class ParentNamePipe implements PipeTransform {

  name: string;

  constructor(private _boardService: BoardCRUDService){}

  transform(value: any): Observable<string> | Subscribable<string> | Promise<string> {
    return this._boardService.readRoom('posts').pipe(
      map(data => {
        data.forEach(element => {
          if(element.payload.doc.id === value){
            this.name = element.payload.doc.data().channelId
          }
        });
        return this.name;
      }),
      switchMap(data => this._boardService.readRoom('channels').pipe(
        map(data => {
          data.forEach(element => {
            if(element.payload.doc.id === this.name){
              this.name = element.payload.doc.data().channelName
            }
          });
          return this.name;
        })
      ))
    );
  }

}
