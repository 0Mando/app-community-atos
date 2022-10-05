import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/domain/models/board.model';
import { BoardService } from 'src/app/infrastructure/services/board.service';

@Component({
	selector: 'app-form-board',
	templateUrl: './form-board.component.html',
	styleUrls: ['./form-board.component.scss']
})
export class FormBoardComponent implements OnInit {

	formBoard : FormGroup;
	currentBoard : Board;

	constructor(private boardService : BoardService) { }

	ngOnInit(): void {
		this.formBoard = new FormGroup({
			'boardName' : new FormControl(null, Validators.required),
			'boardDescription' : new FormControl(null, Validators.required)
		});
	}

	async onSubmit(){
		console.log(this.formBoard.get('boardName').value);
		console.log(this.formBoard.get('boardDescription').value);

		const boardName = this.formBoard.get('boardName').value;
		const boardDescription = this.formBoard.get('boardDescription').value;

		this.currentBoard = {
			boardName : boardName,
			boardDescription : boardDescription
		}

		const response = await this.boardService.createBoard(this.currentBoard);

		// console.log(response);

		// this.formBoard.reset();
	}
}
