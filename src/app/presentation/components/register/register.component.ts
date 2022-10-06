import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/domain/models/user.model';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	user : User;
	formRegisterUser : FormGroup;
	isLoading = false;
	errorMessage: string = '';

	constructor(
		private router: Router,
		private authenticationService : AuthService
	) { }

	ngOnInit(): void {
		this.formRegisterUser = new FormGroup({
			'firstName' : new FormControl(null,Validators.required),
			'lastName' : new FormControl(null, Validators.required),
			'birthday' : new FormControl(null, Validators.required),
			'email' : new FormControl(null, Validators.required),
			'password' : new FormControl(null, Validators.required)
		})
	}

	async onSubmit(){

		this.user = {
			firstName : this.formRegisterUser.get('firstName').value,
			lastName : this.formRegisterUser.get('lastName').value,
			birthday : this.formRegisterUser.get('birthday').value,
			email : this.formRegisterUser.get('email').value,
			password : this.formRegisterUser.get('password').value,
			userType : 'normal-user'
		}

		this.isLoading = true;

		const response = await this.authenticationService.registerUser(this.user).catch(
			error => {
				error.code === 'auth/email-already-in-use' ?
				this.errorMessage = 'The email address is already in use by another account' :
				this.errorMessage = 'An unknown error ocurred.'
			}
		)
		this.isLoading = false;

		if(response){
			console.log('Created user');
			const path = 'Users';
			const id = response.user.uid;
			this.authenticationService.createDocument(this.user, path, id);
			this.isLoading = false;
			this.router.navigate(['/sign-in']);
		}

		this.formRegisterUser.reset();
	}
}
