export interface Quizz { 
    quizzId: string, 
    name: string, 
    questions: Array<Question>
}

export interface Question {
    questionId: string, 
    question: string,
    description: string, 
    correctAnswer: string,
    answers: Answers
}

export interface CurrentQuestion {
    questionId: string, 
    question: string,
    status: string, 
    description: string, 
    correctAnswer: string, 
    answers: Answers
}

export interface Answers {
    a: string, 
    b: string, 
    c: string, 
    d: string 
}