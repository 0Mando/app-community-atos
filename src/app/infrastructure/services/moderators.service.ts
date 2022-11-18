import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeratorsService {

  modList: any[] = [];

  constructor(private firebase: AngularFirestore) { }

  readMods(): Observable<any>{
    return this.firebase.collection('mods').snapshotChanges();
  }

  returnMods(): any[]{
    let modList = [];
    this.readMods().subscribe(doc => {
      doc.forEach(element => {
        modList.push({
          id: element.payload.doc.id,
          ...element.payload.doc.data()
        });
      });
    })
    return modList;
  }
}
