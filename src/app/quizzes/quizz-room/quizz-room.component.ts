import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizzRoom } from 'src/app/models/quizz-room.model';
import { Quizz } from 'src/app/models/quizz.model';
import { CuestionariosService } from 'src/app/services/cuestionarios.service';
import { QuizzRoomsService } from 'src/app/services/quizz-rooms/quizz-rooms.service';

@Component({
  selector: 'app-quizz-room',
  templateUrl: './quizz-room.component.html',
  styleUrls: ['./quizz-room.component.css']
})
export class QuizzRoomComponent implements OnInit {

  quizz: Quizz | null = null;

  quizzRoom: QuizzRoom | null = null;

  currentQuestion = 0;

  answers = Object.entries(this.quizzRoom?.question?.answers ?? {});

  resultsLabels = ['A', 'B', 'C', 'D']

  results = [{ data: [] as Array<number> }]

  constructor(
    private quizzService: CuestionariosService,
    private quizzRoomService: QuizzRoomsService,
    private router: Router) { }

  ngOnInit(): void {
    let quizzId = localStorage.getItem('quizzId')!
    let groupId = localStorage.getItem('groupId')!

    this.quizzService.getQuizz(groupId, quizzId).then((quizz) => {
      this.quizz = quizz
      this.setQuestion().then((e) => { })
    })

    this.quizzRoomService.quizzRoom.subscribe((e) => {
      this.quizzRoom = e;
      this.answers = Object.entries(this.quizzRoom?.question?.answers ?? {});


    })
    let quizzRoomId = localStorage.getItem('quizzRoomId') ?? ""
    this.quizzRoomService.getQuizzRoom(quizzRoomId).then(() => { })
  }

  async setQuestion() {
    let quizzRoomId = localStorage.getItem('quizzRoomId')!
    if (this.quizz?.questions.length ?? 0 > 0) {
      let cq = this.quizz?.questions[this.currentQuestion]!;
      await this.quizzRoomService.setQuestion({ ...cq, status: 'In Progress' }, quizzRoomId);
      this.currentQuestion++;
    }
  }

  async markQuestionAsCompleted() {
    let quizRoomId = localStorage.getItem('quizzRoomId')!
    await this.quizzRoomService.markQuestionAsCompleted(quizRoomId)
    let questionId = this.quizzRoom?.question?.questionId ?? ''
    let rs = await this.quizzRoomService.getResults(quizRoomId, questionId)
    this.results = [{ data: [rs.a, rs.b, rs.c, rs.d] }]
  }

  async finishQuizzRoom() {
    let quizRoomId = localStorage.getItem('quizzRoomId') ?? ''
    this.quizzRoomService.markQuizRoomAsCompleted(quizRoomId)
    localStorage.removeItem('groupId')
    localStorage.removeItem('groupName')
    localStorage.removeItem('quizzId')
    localStorage.removeItem('quizzRoomId')
    localStorage.removeItem('quizzName')


    this.router.navigate(['/grupos'])
  }

  getCorrectAnswer(): string {
    let correct = this.quizzRoom?.question?.correctAnswer as string
    let cq = this.currentQuestion == 0 ? 0 : this.currentQuestion - 1
    let c = this.quizz?.questions?.[cq]

    if(correct == "a") {
      return c?.answers.a ?? ""
    }

    if(correct == "b") {
      return c?.answers.b ?? ""
    }

    if(correct == "c") {
      return c?.answers.c ?? ""
    }

    return c?.answers.d ?? ""
  }

}
