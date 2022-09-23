import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
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

	constructor(private authService: AuthService, private router: Router) { }

	ngOnInit(): void {
	}

	onSubmit(form: NgForm){
		if(!form.valid){
			return;
		}

		console.log(form.value);

		const email = form.value.email;
		const password = form.value.password;

		this.isLoading = true;

		this.authService.login(email, password).subscribe(
			responseData => {
				console.log(responseData);
				this.isLoading = false;
				this.router.navigate(['/boards']);
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
