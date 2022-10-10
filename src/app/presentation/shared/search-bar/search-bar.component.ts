import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
	selector: 'app-search-bar',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

	searchValue: string = '';

	constructor() { }

	ngOnInit(): void {
	}

	@Output()
	searchTextChanged: EventEmitter<string> = new EventEmitter<string>();

	onSearchElement(){
		this.searchTextChanged.emit(this.searchValue.toLowerCase());
	}
}
