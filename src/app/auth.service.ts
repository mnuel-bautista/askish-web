import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { connectAuthEmulator, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getDocs } from '@firebase/firestore';
import { doc, collection, query, where, setDoc, connectFirestoreEmulator } from '@firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { Firebase } from './firebase/firebase';
import { FirebaseService } from './services/firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private firestore;

  private $isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private $currentUser = new BehaviorSubject('');

  currentUser = this.$currentUser.asObservable()

  isAuthenticated = this.$isAuthenticated.asObservable();

  private auth;

  constructor(private af: FirebaseService, private router: Router) {
    this.auth = af.auth
    this.firestore = af.firestore
    this.auth.onAuthStateChanged((currentUser) => {
      this.$isAuthenticated.next(currentUser != null)
      this.$currentUser.next(currentUser?.displayName ?? "")
    })
  }

  async login(email: string, password: string) {
    if (email != null && password != null) {
      await signInWithEmailAndPassword(this.auth, email, password)
        .catch(() => {
          alert("Ocurrió algún error al iniciar sesión")
          return
        })
    

      let userQuery = query(collection(this.firestore, 'users'), where("email", "==", email))
      let user = (await getDocs(userQuery)).docs[0]

      localStorage.setItem('userId', user.id)

      this.router.navigate(['/grupos'])
    }
  }

  async createUser(displayName: string, email: string, password: string) {
    let userCredential = await createUserWithEmailAndPassword(this.auth, email, password)
    localStorage.setItem('userId', userCredential.user.uid)
    await setDoc(doc(this.firestore, "users", userCredential.user.uid), {
      name: displayName,
      email: email,
    })
    await updateProfile(userCredential.user, { displayName: displayName })
  }

  signOut() {
    this.auth.signOut()
  }
}
