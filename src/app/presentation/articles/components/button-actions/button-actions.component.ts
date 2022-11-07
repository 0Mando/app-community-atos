import { Component, DoCheck, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-button-actions',
	templateUrl: './button-actions.component.html',
	styleUrls: ['./button-actions.component.scss']
})
export class ButtonActionsComponent implements OnInit {

	showOptionsList : boolean = false;
	commentAuthorId : string = '';
	@Input() canEdit : boolean;
	@Input() canDelete : boolean;
	@Input() canReport : boolean;

	@Output() editComment = new EventEmitter<boolean>();
	@Output() deleteComment = new EventEmitter<boolean>();
	@Output() reportComment = new EventEmitter<boolean>();

	constructor() { }

	ngOnInit(): void {
	}

	onPressedOptions() : void {
		this.showOptionsList = !this.showOptionsList;
	}

	onPressedCover () : void {
		this.showOptionsList = !this.showOptionsList;
	}

	onEdit() : void {
		this.editComment.emit(true);
	}

	onDelete() : void {
		alert('Deleting');
	}

	onReport() : void {
		alert('Reporting');
	}
}
