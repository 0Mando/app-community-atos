import { ModeratorsService } from './../../../infrastructure/services/moderators.service';
import { Subject } from 'rxjs';
import { Board } from 'src/app/domain/models/board.model';
import { BoardCRUDService } from './../../../infrastructure/services/board-crud.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

  printBoards: Board[] = [];

  currentType = "board";
  currentName: string = 'New Board';

  searchForm: FormGroup;

  isIt = true;
  onEdition = false;

  resetFormSubject: Subject<boolean> = new Subject<boolean>();

  constructor(
    private _roomService: BoardCRUDService,
    private _modService: ModeratorsService,
    private fb: FormBuilder ) {
      this.searchForm = this.fb.group({
        search: ''
      })
     }

  ngOnInit(): void {
    this.obtainMODS();
    this.getBoards();
  }

  obtainMODS(){
    if(this._modService.modList.length === 0){
      this._modService.readMods().subscribe(doc => {
        doc.forEach(element => {
          this._modService.modList.push({
            id: element.payload.doc.id,
            ...element.payload.doc.data()
          });
        });
      });
    }
  }

  getBoards(){
    this._roomService.readRoom('boards').subscribe(doc => {
      if (this.printBoards){
        this.printBoards = [];
      }
      doc.forEach(element => {
        this.printBoards.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        })
      });
    })
  }

  updateBoard(board: Board){
    this.currentName = board.boardName;
    this.onEdition = true;
    setTimeout(() => {
      this._roomService.addRoomEdit(board);
    }, 10);
  }

  changeState(value: boolean){
    this.onEdition = value;
  }

  newBoard(){
    this.currentName = 'New Board';
    this.resetFormSubject.next(true);
    this.onEdition = true;
  }
}
