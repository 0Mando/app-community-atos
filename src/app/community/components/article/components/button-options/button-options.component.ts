import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-options',
	templateUrl: './button-options.component.html',
	styleUrls: ['./button-options.component.scss']
})
export class ButtonOptionsComponent implements OnInit {

	showOptionsList: boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

	onPressedOptions(): void {
		this.showOptionsList = !this.showOptionsList;
	}
}
