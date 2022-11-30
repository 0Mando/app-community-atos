import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Subscription, switchMap, filter, Observable, last, mergeMap } from 'rxjs';
import { Board } from 'src/app/domain/models/board.model';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';
import { BoardService } from 'src/app/infrastructure/services/board.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	currentUser: User;
	itExists: boolean;

	boards: Board[];
	profiles: string[] = [
		'Profile 1',
		'Profile 2',
		'Profile 3'
	];
	loggedIn = false;
	isAdmin: boolean;
	userData: User;

	constructor(private authenticationService: AuthService, private boardService : BoardService, private router : Router) {}

	ngOnInit(): void {
		this.fetchBoardsData();
		this.authenticationService.getCurrentUser().pipe(
			switchMap(user => this.authenticationService.getAdmins().pipe(
			  map(admins => {
				this.isAdmin = false;
				if(user){
					admins.forEach(admin => {
						if(user.uid === admin.id){
						  this.isAdmin = true;
						} 
					})
				}
			  })
			))
		).subscribe();

		this.authenticationService.isUserLogged.pipe(
			map(data => {
				this.currentUser = undefined;
				this.loggedIn = data;
			}),
			switchMap(data => this.authenticationService.getCurrentUser().pipe(
				map(user => {
					if(user){
						return user.uid;
					}
				})
			)),
			switchMap(data => this.authenticationService.onFetchUserInformation(data).pipe(
				map(data => {
					this.currentUser = {
						...data.payload.data()
					}
					this.itExists = data.payload.exists
					
				})
			))
		).subscribe();
	}

	toggleMenu(): void {
		let menu = document.querySelector('.header')!;
		menu.classList.toggle('active-menu');
	}

	iconToggleMenu(): void {
		let menu = document.querySelector('.header')!;
		menu.classList.remove('active-menu');
	}

	onLogout(): void{
		this.authenticationService.logout();
		this.router.navigate(['sign-in']);
	}

	/**
	 * Get the information of the current user in the session.
	 * @param idUser
	 */
	fetchUserData(idUser : string){
		this.authenticationService.onFetchUserInformation(idUser).subscribe(
			(user) => {
				this.currentUser = {...user.payload.data()}
			}
		)
	}

	fetchBoardsData(){
		this.boardService.getBoardsList<Board>().subscribe(
			boards =>{
				this.boards = boards;
			}
		);
	}
}
