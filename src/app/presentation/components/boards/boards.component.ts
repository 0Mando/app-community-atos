import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Board } from 'src/app/domain/models/board.model';

@Component({
	selector: 'app-boards',
	templateUrl: './boards.component.html',
	styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {

	boards: Board[] = [];
	lista:string[]=["hola","que","tal","estas"];

	constructor(private http: HttpClient) { }

	ngOnInit(): void {
		this.fetchBoards();
	}

	private fetchBoards(){
		this.http.get<{ [key:string]: Board }>(
			'https://atos-community-upgrade-default-rtdb.firebaseio.com/boards.json'
		).pipe(
			map(
				response =>{
					const boardsArray: Board[] = [];
					for(const key in response){
						if(response.hasOwnProperty(key)){
							boardsArray.push({...response[key], id: key})
						}
					}
					return boardsArray;
				}
			)
		).subscribe(
			boards =>{
				this.boards = boards;
			}
		)
	}
}
