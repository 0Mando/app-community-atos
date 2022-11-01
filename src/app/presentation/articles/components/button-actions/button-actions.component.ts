import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-button-actions',
	templateUrl: './button-actions.component.html',
	styleUrls: ['./button-actions.component.scss']
})
export class ButtonActionsComponent implements OnInit {

	//* Condition to display mini menu options on comments
	showMenuActions: boolean = false;

	constructor() { }

	ngOnInit(): void {
	}

	@HostListener('document:click', ['$event.target'])
	onClick(btn: any) {
		console.log('On Click');
		this.showMenuActions = !this.showMenuActions;
	}
}
