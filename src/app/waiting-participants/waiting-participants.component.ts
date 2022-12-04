import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestoreService } from '../firebase/firestore.service';
import { QuizzRoom } from '../models/quizz-room.model';
import { CurrentQuestion } from '../models/quizz.model';
import { CuestionariosService } from '../services/cuestionarios.service';
import { QuizzRoomsService } from '../services/quizz-rooms/quizz-rooms.service';

@Component({
  selector: 'app-waiting-participants',
  templateUrl: './waiting-participants.component.html',
  styleUrls: ['./waiting-participants.component.css']
})
export class WaitingParticipantsComponent implements OnInit {

  constructor(private service: QuizzRoomsService,
    private groupsService: FirestoreService, 
    private router: Router) { }

  ngOnInit(): void {
    let host = localStorage.getItem('userId')
    let groupId = localStorage.getItem('groupId')
    let groupName = localStorage.getItem('groupName')
    let quizId = localStorage.getItem('quizzId')
    let quizzName = localStorage.getItem('quizzName')
    let roomStatus = "Not Started"

   
    this.groupsService.getGroup(groupId).then((group) => {
      let quizz = <QuizzRoom>{
        host,
        group: { groupId, name: groupName },
        quiz: { quizId, name: quizzName },
        quizRoomStatus: roomStatus,
        guests: group?.members,
        participants: {}
      }

      return quizz
    }).then((quizRoom) => {
      this.service.createQuizzRoom(quizRoom).then((e) => {
        localStorage.setItem('quizzRoomId', e)
      })
    })
    
  }

  async startQuizRoom() {
    let quizRoomId = localStorage.getItem('quizzRoomId') ?? ""
    await this.service.startQuizRoom(quizRoomId)
    this.router.navigate(['/sala']);
  }

}
