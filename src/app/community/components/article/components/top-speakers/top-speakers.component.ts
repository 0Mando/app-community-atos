import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-top-speakers',
	templateUrl: './top-speakers.component.html',
	styleUrls: ['./top-speakers.component.scss']
})
export class TopSpeakersComponent implements OnInit {

	articles = [1,2,3,4,5,6]

	constructor() { }

	ngOnInit(): void {
	}

}
