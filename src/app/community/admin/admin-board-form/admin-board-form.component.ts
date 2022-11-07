import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/domain/models/board.model';
import { BoardService } from 'src/app/infrastructure/services/board.service';

@Component({
	selector: 'app-admin-board-form',
	templateUrl: './admin-board-form.component.html',
	styleUrls: ['./admin-board-form.component.scss']
})
export class AdminBoardFormComponent implements OnInit {

	formBoard : FormGroup;
	board : Board;

	constructor(private boardService : BoardService) { }

	ngOnInit(): void {
		this.formBoard = new FormGroup({
			'boardName' : new FormControl(null, Validators.required),
			'boardDescription' : new FormControl(null, Validators.required)
		})
	}

	async onCreateBoard(){
		console.log(this.formBoard);

		this.board = {
			'boardName' : this.formBoard.get('boardName').value,
			'boardDescription' : this.formBoard.get('boardDescription').value
		}

		const response = await this.boardService.createBoard(this.board).catch(
			error => {
				console.log('An error ocurred ' + error);
			}
		)

		this.formBoard.reset();
	}
}
