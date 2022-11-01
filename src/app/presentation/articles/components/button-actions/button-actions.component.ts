import { Component, DoCheck, HostListener, OnChanges, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-actions',
	templateUrl: './button-actions.component.html',
	styleUrls: ['./button-actions.component.scss']
})
export class ButtonActionsComponent implements OnInit, OnChanges {


	displayMenuActions: boolean = true;

	constructor() { }

	ngOnInit(): void {
	}

	ngOnChanges(): void {
		console.log('On Changes');
		console.log(this.displayMenuActions);
	}

	displayMenuAction(): void {
		console.log('Button pressed  - >' + this.displayMenuActions);
		this.displayMenuActions = !this.displayMenuActions;
	}

	@HostListener('document:click', ['$event']) onDocumentClick(event) {
		// this.displayMenuActions = true;
	}
}
