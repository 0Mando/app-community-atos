import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeratorsService {

  constructor(private firebase: AngularFirestore) { }

  readMods(): Observable<any>{
    return this.firebase.collection('mods').snapshotChanges();
  }
}
