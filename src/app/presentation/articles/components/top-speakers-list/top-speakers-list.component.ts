import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-top-speakers-list',
	templateUrl: './top-speakers-list.component.html',
	styleUrls: ['./top-speakers-list.component.scss']
})
export class TopSpeakersListComponent implements OnInit {

	articles = [1,2,3,4,5,6]

	constructor() { }

	ngOnInit(): void {
	}

}
