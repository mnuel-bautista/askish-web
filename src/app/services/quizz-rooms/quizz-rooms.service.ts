import { Injectable } from '@angular/core';
import { QuestionResult, QuizzRoom } from 'src/app/models/quizz-room.model';

import { collection, doc, updateDoc, onSnapshot, addDoc, getDoc } from '@firebase/firestore';
import { FirebaseService } from '../firebase.service';
import { Subject, ReplaySubject } from 'rxjs';
import { CurrentQuestion, Question } from 'src/app/models/quizz.model';

@Injectable({
  providedIn: 'root'
})
export class QuizzRoomsService {

  private firestore;

  private quizzRoom$: Subject<QuizzRoom> = new ReplaySubject();

  public quizzRoom = this.quizzRoom$.asObservable();

  constructor(private af: FirebaseService) {
    this.firestore = af.firestore;
  }

  async getQuizzRoom(quizzRoomId: string) {
    onSnapshot(doc(this.firestore, 'salas', quizzRoomId), (doc) => {

      let host = doc.get('host') as string
      let groupId = doc.get('group.groupId') as string
      let groupName = doc.get('group.name') as string
      let quizId = doc.get('quiz.quizId') as string
      let quizName = doc.get('quiz.name') as string
      let quizzStatus = doc.get('quizRoomStatus') as string
      let question = doc.get('question') as CurrentQuestion
      let guests = doc.get('guests') as Object
      let participants = doc.get('participants') as Object

      this.quizzRoom$.next(<QuizzRoom>{
        host,
        group: { groupId, name: groupName },
        quiz: { quizId, name: quizName },
        quizRoomStatus: quizzStatus,
        question: question,
        guests,
        participants,
      })
    })
  }

  async createQuizzRoom(room: QuizzRoom): Promise<string> {

    let doc = await addDoc(collection(this.firestore, 'salas'), { ...room })

    return doc.id
  }

  async startQuizRoom(quizRoomId: string) {
    await updateDoc(doc(this.firestore, 'salas', quizRoomId), {
      quizRoomStatus: 'In Progress'
    })
  }

  async setQuestion(question: CurrentQuestion, quizzRoomId: string) {
    await updateDoc(doc(this.firestore, 'salas', quizzRoomId), {
      question: question
    })
  }

  async markQuestionAsCompleted(quizRoomId: string) {
    await updateDoc(doc(this.firestore, `salas`, quizRoomId), {
      "question.status": 'Completed'
    })
  }

  async markQuizRoomAsCompleted(quizRoomId: string) {
    await updateDoc(doc(this.firestore, `salas`, quizRoomId), {
      quizRoomStatus: 'Completed'
    })
  }

  async getResults(quizRoomId: string, questionId: string): Promise<QuestionResult> {

    let document = await getDoc(doc(this.firestore, `salas/${quizRoomId}/results/${questionId}`))

    let question = document.get('question') as string | null ?? ""
    let a = Object.keys(document.get('a') as Object | undefined ?? {}).length
    let b = Object.keys(document.get('b') as Object | undefined ?? {}).length
    let c = Object.keys(document.get('c') as Object | undefined ?? {}).length
    let d = Object.keys(document.get('d') as Object | undefined ?? {}).length

    return { question, a, b, c, d }
  }

}
