import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/domain/models/board.model';


@Component({
	selector: 'app-form-channel',
	templateUrl: './form-channel.component.html',
	styleUrls: ['./form-channel.component.scss']
})
export class FormChannelComponent implements OnInit {

	formChannel : FormGroup;
	boards: Board[] = [];

	// constructor(
	// 	private http: HttpClient,
	// 	private channelService: ChannelService,
	// 	private boardService: BoardService
	// ) { }

	ngOnInit(): void {
		// this.formChannel = new FormGroup({
		// 	'channelName' : new FormControl(null, Validators.required),
		// 	'channelDescription' : new FormControl(null, Validators.required),
		// 	'channelImage' : new FormControl(null, Validators.required),
		// 	'parentBoard' : new FormControl(null, Validators.required)
		// });

		// this.boardService.fetchBoards().subscribe(
		// 	boards =>{
		// 		this.boards = boards;
		// 	}
		// );
	}

	// onSubmit(){
	// 	const channelName = this.formChannel.get('channelName').value;
	// 	const channelDescription = this.formChannel.get('channelDescription').value;
	// 	const channelImage = this.formChannel.get('channelImage').value;
	// 	const parentBoard = this.formChannel.get('parentBoard').value;

	// 	this.channelService.createChannel(
	// 		channelName,
	// 		channelDescription,
	// 		channelImage,
	// 		parentBoard
	// 	);

	// 	this.formChannel.reset();
	// }

}
