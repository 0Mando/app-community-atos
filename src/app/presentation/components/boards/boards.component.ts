import { Component, OnInit } from '@angular/core';
import { Board } from 'src/app/domain/models/board.model';

@Component({
	selector: 'app-boards',
	templateUrl: './boards.component.html',
	styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

	boards: Board[] = [];

	constructor() { }

	ngOnInit(): void {
		// this.boardService.fetchBoards().subscribe(
		// 	boards =>{
		// 		this.boards = boards;
		// 	}
		// );
	}
}
