import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/domain/models/board.model';
import { BoardService } from 'src/app/infrastructure/services/board.service';

@Component({
	selector: 'app-boards',
	templateUrl: './boards.component.html',
	styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

	boards: Board[] = [];
	searchBoard : FormGroup;

	//* Pagination stuff
	boardsLength: number;
	page : number = 1;

	constructor(private boardService : BoardService) { }

	ngOnInit(): void {
		this.showBoardsList();
		this.searchBoard = new FormGroup({
			'searchBoardName' : new FormControl(null, Validators.required)
		})
	}

	showBoardsList(){
		this.boardService.getBoardsList<Board>().subscribe(
			boards =>{
				this.boards = boards;
				this.boardsLength = this.boards.length;
			}
		);
	}

	onSearch(){
		const board : string = this.searchBoard.get('searchBoardName').value;
		console.log(this.searchBoard.value);
		this.boardService.searchBoard<Board>(board).subscribe(
			boards=>{
				this.boards = boards;
				console.log(boards);
			}
		)
		this.searchBoard.reset();
	}
}
