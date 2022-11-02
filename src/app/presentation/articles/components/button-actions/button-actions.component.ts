import { Component, DoCheck, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

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

	constructor(private authenticationService : AuthService) { }

	ngOnInit(): void {
	}

	onPressedOptions() : void {
		this.showOptionsList = !this.showOptionsList;
	}

	onPressedCover () : void {
		this.showOptionsList = !this.showOptionsList;
	}

	onEdit() : void {
		alert('Editing');
	}

	onDelete() : void {
		alert('Deleting');
	}

	onReport() : void {
		alert('Reporting');
	}
}
