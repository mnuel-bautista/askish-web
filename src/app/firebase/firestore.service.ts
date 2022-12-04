import { Injectable } from '@angular/core';
import { Firebase } from './firebase';
import { getFirestore, collection, query, doc, getDoc,  where, getDocs, connectFirestoreEmulator } from '@firebase/firestore';
import { addDoc, onSnapshot } from '@firebase/firestore';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';
import { Question, Quizz } from '../models/quizz.model';
import { Group } from '../models/group.model';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  private firestore;

  private auth;

  private $grupos: BehaviorSubject<Array<Group>> = new BehaviorSubject(<Array<Group>>[]);

  grupos = this.$grupos.asObservable();

  constructor(private af: Firebase) {
    this.firestore = getFirestore(this.af.app)
    this.auth = getAuth(this.af.app)
    connectAuthEmulator(this.auth, "http://localhost:9099")
    connectFirestoreEmulator(this.firestore, 'localhost', 8080);

    this.getAllGroupsByUser().then(() => {

    }).catch((error) => {
      alert(error);
    })
  }

  async createGroup(group: string) {

    let userId = localStorage.getItem('userId')

    let groupCode = this.makeid(6)
    await addDoc(collection(this.firestore, 'groups'), {
      group,
      creator: userId,
      code: groupCode,
    })
  }

  private makeid(length: number) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  async getGroup(groupId: string | null): Promise<Group | null> {

    let userId = localStorage.getItem('userId')

    if (userId != null) {

      let document = doc(this.firestore, `groups/${groupId}`)
      let quiz = await getDoc(document)

      let gpId = quiz.id as string;
      let name = quiz.get('group') as string
      let code = quiz.get('code') as string
      let creator = quiz.get('creator') as string
      let members = quiz.get('members') as Object

      return <Group>{ groupId: gpId, code, creator, name, members }
    }

    return null
  }


  //Obtiene todos los grupos del usuario que ha iniciado sesión.
  async getAllGroupsByUser() {

    let userId = localStorage.getItem('userId')

    if (userId != null) {

      let ref = collection(this.firestore, 'groups')
      let qr = query(ref, where("creator", "==", userId))

      onSnapshot(qr, (snapshot) => {
        let docs = snapshot.docs
        let grupos = docs.map((element) => {
          let groupId = element.id as string;
          let name = element.get('group') as string
          let code = element.get('code') as string
          let creator = element.get('creator') as string
          let members = element.get('members') as Object

          return { groupId, code, creator, name, members }
        })

        this.$grupos.next(grupos)
      })
    }
  }

  async getAllQuizzesByGroup(groupId: string): Promise<Quizz[]> {

    let ref = collection(this.firestore, `groups/${groupId}/quizzes`)
    let documents = await getDocs(ref)

    let quizzes = documents.docs.map((document) => {
      let name = document.get('quiz') as string
      let questions = document.get('questions') as Array<Question>

      return <Quizz>{ quizzId: document.id, name: name, questions: questions }
    })

    return quizzes
  }

}
