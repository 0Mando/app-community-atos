import { Component, DoCheck, HostListener, OnChanges, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-actions',
	templateUrl: './button-actions.component.html',
	styleUrls: ['./button-actions.component.scss']
})
export class ButtonActionsComponent implements OnInit {

	showOptionsList : boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

	onPressedOptions() : void {
		this.showOptionsList = !this.showOptionsList;
		console.log('Pressed');
	}

	onPressedCover () : void {
		this.showOptionsList = !this.showOptionsList;
	}
}
