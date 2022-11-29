import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';


@Component({
	selector: 'app-channels',
	templateUrl: './channels.component.html',
	styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

	boardId: string;
	search: string;

	searchForm: FormGroup;

	constructor(
		private route: ActivatedRoute,
		private _channelService : ChannelService,
		private fb: FormBuilder
	) {
		this.searchForm = this.fb.group({
			search: ''
		})
	 }

	ngOnInit(): void {

		this.boardId = this.route.snapshot.params['boardId'];

		this.route.params.subscribe(
			(params: Params)=>{
				this.boardId = params['boardId'];
				this._channelService.channelRoute.next(params['boardId']);
			}
		)
	}
}
