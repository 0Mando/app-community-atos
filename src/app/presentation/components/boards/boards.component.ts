import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/domain/models/board.model';
import { BoardService } from 'src/app/infrastructure/services/board.service';

@Component({
	selector: 'app-boards',
	templateUrl: './boards.component.html',
	styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

	boards: Board[] = [];

	constructor(private boardService : BoardService) { }

	ngOnInit(): void {
		this.showBoardsList();
	}

	showBoardsList(){
		this.boardService.getBoardsList<Board>().subscribe(
			boards =>{
				this.boards = boards;
				console.log(boards);
			}
		);
	}
}
