import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { getFirestore, connectFirestoreEmulator } from '@firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  public firestore;

  public auth;

  private app = initializeApp(environment.firebase)

  constructor() {
    this.firestore = getFirestore(this.app)
    this.auth = getAuth(this.app)

  }
}
