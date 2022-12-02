import { BehaviorSubject, Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';
import { User } from 'src/app/domain/models/user.model';
import { deleteUser, getAuth } from "firebase/auth";

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	userData : any;
	userID: string;
	isUserLogged = new BehaviorSubject<boolean>(this.isLoggedIn);

	auth = getAuth();

	constructor(private fireAuth: AngularFireAuth, private afs: AngularFirestore) {
		this.fireAuth.authState.subscribe((user) => {
			if(user) {
				this.userData = user;
				this.userID = user.uid;
				localStorage.setItem('user', JSON.stringify(this.userData));
				JSON.parse(localStorage.getItem('user')!);
			} else {
				localStorage.setItem('user', 'null');
				JSON.parse(localStorage.getItem('user')!);
			}
		})
	}

	login(email: string, password: string){
		return this.fireAuth.signInWithEmailAndPassword(email, password);
	}

	registerUser(user : User){
		return this.fireAuth.createUserWithEmailAndPassword(user.email, user.password);
	}

	createDocument(data: any, path: string, id: string){
		const collection = this.afs.collection(path);
		return collection.doc(id).set(data);
	}

	get isLoggedIn() : boolean {
		const user = JSON.parse(localStorage.getItem('user')!);
		return user !== null;
	}

	logout() {
		return this.fireAuth.signOut().then(() => {
			this.isUserLogged.next(false);
			localStorage.removeItem('user');
		})
	}

	getUserById<User>() {
		const userDocument = this.afs.collection<User>('Users').doc(this.userData.uid);
		return userDocument.valueChanges({ idField : 'id' });
	}

	getUserList<User>(){
		return this.afs.collection<User>('Users').snapshotChanges();
	}

	currentSessionUserId() : string {
		return this.userData.uid;
	}

	onFetchUserInformation(idUser : string): Observable<any> {
		return this.afs.collection('Users').doc(idUser).snapshotChanges();
	}

	getAdmins<User>(){
		return this.afs.collection<User>("Users", ref => ref.where("userType", "==", "admin")).get();
	}

	getCurrentUser(){
		return this.fireAuth.authState;
	}

	disableUser(userId:string){
		this.afs.collection<User>('Users').doc(userId).update({userType: "disabled"});
	}

	undoDisableUser(userId:string, userTypeBackup: "normal-user" | "auth-user" | "moderator" | "admin"){
		this.afs.collection<User>('Users').doc(userId).update({userType: userTypeBackup});
	}

	getUserInformation(userId: string) {
		return this.afs.collection('Users').doc(userId).valueChanges();
  }

	deleteUser(id: string){
		this.afs.collection<User>('Users').doc(id).delete();
	}

	updateComments(userId: string, counterComments: number) {
		return this.afs.collection('Users').doc(userId).update({comments: counterComments});
	}

	getTopSpeakers() {
		return this.afs.collection<User>(
			'Users',
			(ref) => ref
				.orderBy('comments','desc')
		).valueChanges({ idField : 'id' });
	}
}
