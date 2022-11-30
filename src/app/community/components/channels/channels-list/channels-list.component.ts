import { fromEvent, switchMap } from 'rxjs';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Channel } from 'src/app/domain/models/channel.model';
import { ChannelService } from 'src/app/infrastructure/services/channel.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-channels-list',
	templateUrl: './channels-list.component.html',
	styleUrls: ['./channels-list.component.scss']
})
export class ChannelsListComponent implements OnInit {

	searchForm: FormGroup;

	channels: Channel[];
	parentBoard : string;
	//* Pagination stuff
	channelsLength : number;
	pageChannel : number = 1;

	@Input() boardId : string;

	constructor(
		private channelService : ChannelService,
		private router : Router,
		private fb: FormBuilder
	) {
		this.searchForm = this.fb.group({
			search: ''
		})
	 }

	ngOnInit(): void {
		this.channelService.channelRoute.pipe(
			switchMap(route => this.channelService.displayChannelsOfParenBoard<Channel>(route))
		).subscribe(channels => {
			this.channels = channels;
			this.channelsLength = this.channels.length;
			if(this.channels.length === 0) {
				this.router.navigate(['not-available-articles']);
			}
		});
	}
}
