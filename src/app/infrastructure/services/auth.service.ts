import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

//! Información que necesita firebase
interface AuthResponseData{
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
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
		);
	}
}

// TODO Crear servicio que registre usuarios en la aplicación y que puedan iniciar sesión
