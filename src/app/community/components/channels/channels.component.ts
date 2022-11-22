import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
	selector: 'app-channels',
	templateUrl: './channels.component.html',
	styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

	boardId: string

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {

		this.boardId = this.route.snapshot.params['boardId']

		this.route.params.subscribe(
			(params: Params)=>{
				this.boardId = params['boardId'];
			}
		)
	}
}
