import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-articles',
	templateUrl: './articles.component.html',
	styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

	articleName : string = '';
	userIsLoggedIn : boolean;

	constructor(
		private route: ActivatedRoute,
		private router : Router,
		private authenticationService : AuthService
	) { }

	ngOnInit(): void {
		this.route.params.subscribe(
			(params : Params)=>{
				this.articleName = params['channelName']
			}
		)
	}

	onCreatePost() {
		if(this.userIsLogged() && this.isVerified()){
			this.router.navigate(['articles/create-post'], { queryParams : { channel : this.articleName } });
		} else if(this.userIsLogged() && !this.isVerified()) {
			alert('Please verified your accout');
		} else {
			alert('Please login');
		}
	}

	userIsLogged() : boolean {
		return this.authenticationService.isLoggedIn;
	}

	isVerified() : boolean {
		return true;
	}
}
