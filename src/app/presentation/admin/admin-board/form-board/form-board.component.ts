import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-form-board',
	templateUrl: './form-board.component.html',
	styleUrls: ['./form-board.component.scss']
})
export class FormBoardComponent implements OnInit {

	formBoard : FormGroup;

	// constructor(private http: HttpClient,private boardService: BoardService) { }
	constructor() { }

	ngOnInit(): void {
		// this.formBoard = new FormGroup({
		// 	'boardName' : new FormControl(null, Validators.required),
		// 	'boardDescription' : new FormControl(null, Validators.required)
		// });
	}

	// onSubmit(){
	// 	console.log(this.formBoard.get('boardName').value);
	// 	console.log(this.formBoard.get('boardDescription').value);

	// 	const boardName = this.formBoard.get('boardName').value;
	// 	const boardDescription = this.formBoard.get('boardDescription').value;

	// 	this.boardService.createBoard(boardName, boardDescription);

	// 	this.formBoard.reset();
	// }

}
