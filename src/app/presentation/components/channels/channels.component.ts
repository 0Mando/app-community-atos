import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
	selector: 'app-channels',
	templateUrl: './channels.component.html',
	styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

	boardName: string

	constructor(
		private route: ActivatedRoute,
	) { }

	ngOnInit(): void {

		this.boardName = this.route.snapshot.params['boardName']

		this.route.params.subscribe(
			(params: Params)=>{
				this.boardName = params['boardName'];
			}
		)
	}
}
