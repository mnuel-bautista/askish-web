import { CurrentQuestion } from "./quizz.model";

export interface QuizzRoom {
    host: string, 
    group: { groupId: string, name: string }, 
    quiz: { quizId: string, name: string }, 
    quizRoomStatus: string,
    question?: CurrentQuestion,  
    guests: Object, 
    participants: Object
}

export interface QuestionResult {
    question: string, 
    a: number, 
    b: number, 
    c: number, 
    d: number
}