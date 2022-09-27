import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Board } from 'src/app/domain/models/board.model';

@Component({
	selector: 'app-card-board-item',
	templateUrl: './card-board-item.component.html',
	styleUrls: ['./card-board-item.component.scss']
})
export class CardBoardItemComponent implements OnInit {

	@Input() boardList: Board;
	@Input() styleImpar;
	@Input() stylePar;

	constructor(private router: Router) { }

	ngOnInit(): void {
	}


	goToChannels(){
		this.router.navigate(['/channels']);
	}
}
