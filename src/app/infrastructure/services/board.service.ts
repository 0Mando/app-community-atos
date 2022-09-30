import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Board } from 'src/app/domain/models/board.model';

@Injectable({
	providedIn: 'root'
})
export class BoardService {

	constructor(private http: HttpClient) { }

	createBoard(title: string, content: string){
		const boardData: Board = { title : title, content : content };

		this.http.post<{ name: string }>(
			'https://atos-community-upgrade-default-rtdb.firebaseio.com/boards.json',
			boardData
		).subscribe(
			responseData =>{
				console.log(responseData);
			}
		)
	}

	fetchBoards(){
		return this.http.get<{ [key:string]: Board }>(
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
		);
	}
}
