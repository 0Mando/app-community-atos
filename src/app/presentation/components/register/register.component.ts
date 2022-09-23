import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { retry } from 'rxjs';
import { AuthService } from 'src/app/infrastructure/services/auth.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

	isLoading = false;
	errorMessage: string = '';

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	onSubmit(form: NgForm){
		if(!form.valid){
			return;
		}
		console.log(form.value);

		// TODO: Proximamente agregar estos campos cuando se tenga el endpoint configurado
		//* const firstName = form.value.firstName;
		//* const lastName = form.value.lastName;
		//* const birthday = form.value.birthday;

		const email = form.value.email;
		const password = form.value.password;

		this.isLoading = true;

		this.authService.signUp(email, password).subscribe(
			responseData => {
				console.log(responseData);
				this.isLoading = false;
				this.router.navigate(['/sign-in']);
			},
			errorMessage => {
				console.log(errorMessage);
				this.errorMessage = errorMessage;
				this.isLoading = false;
			}
		)

		form.reset();
	}
}
