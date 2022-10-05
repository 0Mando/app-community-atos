import { Injectable } from '@angular/core';
import { User } from 'src/app/domain/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {

	constructor(private fireAuth: AngularFireAuth) { }

	login(email: string, password: string){
		return this.fireAuth.signInWithEmailAndPassword(email, password);
	}

	registerUser(user : User){
		return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
	}
}
