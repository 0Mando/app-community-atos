import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	isLoading = false;
	errorMessage: string = '';
	loginUserForm : FormGroup;

	constructor(
		private authenticationService : AuthService,
		private router: Router
	) { }

	ngOnInit(): void {
		this.loginUserForm = new FormGroup({
			'email' : new FormControl(null, [Validators.required, Validators.email]),
			'password' : new FormControl(null, Validators.required)
		})
	}

	async onSubmit(){
		const email = this.loginUserForm.get('email').value;
		const password = this.loginUserForm.get('password').value;

		const response = await this.authenticationService.login(email, password).catch(
			//! Errores de Firebase
			error => {
				switch(error.code){
					case 'auth/invalid-email':
						this.errorMessage = 'Invalid email';
					break;
					case 'auth/missing-email':
						this.errorMessage = 'Missing credentials';
					break;
					case 'auth/user-not-found':
					case 'auth/wrong-password':
						this.errorMessage = 'User not found';
					break;
				}

				this.isLoading = false;
			}
		)

		//* Acceso a boards
		if(response){
			console.log(response);
			this.isLoading = false;
			this.router.navigate(['/boards']);
		}

		console.log(this.authenticationService.isLoggedIn);

		this.loginUserForm.reset();
	}
}
