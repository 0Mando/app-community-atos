import { Profile } from 'src/app/domain/models/profile.model';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyprofileService {
  // private profile$ = new Subject<any>();

  constructor(private firebase: AngularFirestore) { }

  // saveInfo(profile: Profile): Promise<any> {
  //   return this.firebase.collection('profiles').add(profile)
  // }

  saveInfo(id: string, profile: any): Promise<any>{
    return this.firebase.collection('Users').doc(id).update(profile);
  }

  getInfo(id: string): Observable<any> {
    return this.firebase.collection('Users').doc(id).snapshotChanges();
  }
}
