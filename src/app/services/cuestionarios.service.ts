import { Injectable } from '@angular/core';
import { collection, doc, query, where, getDocs, getDoc, addDoc } from '@firebase/firestore';
import { Question, Quizz } from '../models/quizz.model';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class CuestionariosService {

  private firestore;

  constructor(private af: FirebaseService) {
    this.firestore = af.firestore;
  }


  async createQuizz(group: string, name: string): Promise<{ groupId: string, quizzId: string }> {
    let userId = localStorage.getItem('userId')

    let qr = query(collection(this.firestore, 'groups'),
      where('creator', '==', userId),
      where('group', '==', group))

    let docs = await getDocs(qr)
    let groupId = docs.docs[0].id

    let res = await addDoc(collection(this.firestore, `groups/${groupId}/quizzes`), {
      quiz: name,
    })

    return { groupId: groupId, quizzId: res.id }
  }

  async addQuestion(groupId: string, quizzId: string, question: Question) {
    await addDoc(collection(this.firestore, `groups/${groupId}/quizzes/${quizzId}/questions`), {
      question: question.question, 
      description: question.description, 
      correctAnswer: question.correctAnswer, 
      answers: question.answers, 
    })
  }

  async getQuizz(groupId: string, quizzId: string): Promise<Quizz> {
    let document = await getDoc(doc(this.firestore, `groups/${groupId}/quizzes/${quizzId}`))

    let name = document.get('quiz') as string

    let qDocuments = await getDocs(collection(this.firestore, `groups/${groupId}/quizzes/${quizzId}/questions`))

    let questions = qDocuments.docs.map((e) => {

      let questionId = e.id
      let question = e.get('question') as string
      let description = e.get('description') as string
      let correctAnswer = e.get('correctAnswer') as string
      let answers = e.get('answers') as Object

      return <Question>{ 
        questionId,
        question,
        description,
        correctAnswer, 
        answers 
      }
    })

    return <Quizz>{ quizzId: document.id, name: name, questions: questions }
  }
}
