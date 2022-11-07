import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from 'src/app/domain/models/board.model';
import { Channel } from 'src/app/domain/models/channel.model';
import { BoardService } from 'src/app/infrastructure/services/board.service';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';

@Component({
	selector: 'app-admin-channel-form',
	templateUrl: './admin-channel-form.component.html',
	styleUrls: ['./admin-channel-form.component.scss']
})
export class AdminChannelFormComponent implements OnInit {

	formChannel : FormGroup;
	boards: Board[] = [];
	channel : Channel;

	constructor(
		private boardService : BoardService,
		private channelService : ChannelService
	) { }

	ngOnInit(): void {
		this.getBoardList();

		this.formChannel = new FormGroup({
			'channelName' : new FormControl(null, Validators.required),
			'channelDescription' : new FormControl(null, Validators.required),
			'channelImage' : new FormControl(null, Validators.required),
			'parentBoard' : new FormControl(null, Validators.required)
		});
	}

	async onCreateChannel(){
		console.log(this.formChannel);

		this.channel = {
			'channelName' : this.formChannel.get('channelName').value,
			'channelDescription' : this.formChannel.get('channelDescription').value,
			'channelImage' : this.formChannel.get('channelImage').value,
			'parentBoard' : this.formChannel.get('parentBoard').value
		}

		await this.channelService.createChannel(this.channel).catch(
			error=>{
				console.log('An error ocurred '+ error);
			}
		);

		this.formChannel.reset();
	}

	private getBoardList(){
		this.boardService.getBoardsList<Board>().subscribe(
			boards =>{
				this.boards = boards;
			}
		)
	}

}
