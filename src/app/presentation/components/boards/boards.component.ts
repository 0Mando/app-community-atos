import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Board } from 'src/app/domain/models/board.model';
import { BoardService } from 'src/app/infrastructure/services/board.service';

@Component({
	selector: 'app-boards',
	templateUrl: './boards.component.html',
	styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

	boards: Board[] = [];

	constructor(private http: HttpClient, private boardService : BoardService) { }

	ngOnInit(): void {
		this.boardService.fetchBoards().subscribe(
			boards =>{
				this.boards = boards;
			}
		);
	}
}
