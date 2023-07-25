import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from 'shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private currentUserUid: string;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    auth.appUser$.subscribe(appUser => this.currentUserUid = appUser.uid);
  }

  public addTo(key: string, data: any): void {
    if (this.currentUserUid) {
      this.afs.doc<any>(`data/${this.currentUserUid}/${key}`).set(data);
    }
  }

  public getFrom(key: string): void {
    if (this.currentUserUid) {
      this.afs.doc<any>(`data/${this.currentUserUid}/${key}`).get();
    }
  }

  public addToShared(key: string, data: any): void {
    this.afs.doc<any>(`data/shared/${key}`).set(data);
  }
}
