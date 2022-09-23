import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, throwError } from 'rxjs';

//! Información que necesita firebase
interface AuthResponseData{
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private http: HttpClient) { }

	signUp(email: string, password: string){
		return this.http.post<AuthResponseData>(
			//! Endpoint de firebase -> sustituir por el end point de C#
			'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
			{
				email: email,
				password: password,
				returnSecureToken: true
			}
		).pipe(
			catchError(this.handleError)
		)
	}

	login(email: string, password: string){
		return this.http.post<AuthResponseData>(
			//! Endpoint de firebase -> sustituir por el end point de C#
			'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+ environment.firebaseAPIKey,
			{
				email: email,
				password: password,
				returnSecureToken: true
			}
		).pipe(
			catchError(this.handleError)
		)
	}


	private handleError(errorResponse: HttpErrorResponse){
		let errorMessage = 'An unknown error ocurred!';

		if(!errorResponse.error || !errorResponse.error.error){
			return throwError(errorMessage);
		}

		//! Errores de firebase
		switch(errorResponse.error.error.message){
			case 'EMAIL_EXISTS':
				errorMessage = 'This email exists already';
			break;

			case 'EMAIL_NOT_FOUND':
			case 'INVALID_PASSWORD':
				errorMessage = 'The email or the password does not exist';
			break;
		}

		return throwError(errorMessage);
	}
}
