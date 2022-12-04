import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FirestoreService } from '../firebase/firestore.service';
import { Group } from '../models/group.model';
import { Quizz } from '../models/quizz.model';
import { GroupCodeComponent } from './group-code/group-code.component';
import { NuevoGrupoComponent } from './nuevo-grupo/nuevo-grupo.component';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.css']
})
export class GruposComponent implements OnInit {

  userName = '';

  public grupos: Array<Group> = [] as Array<Group>;

  public group: Group | null = null;

  public cuestionarios: Array<Quizz> = []

  constructor(
    private auth: AuthService,
    private firestore: FirestoreService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.auth.currentUser.subscribe((currentUser) => {
      /*  if(user != null) {
         this.user = user.displayName ?? user.email ?? ''; 
       } */
      this.userName = currentUser;
    })

    this.firestore.grupos.subscribe((values) => {
      this.grupos = values
      if(values.length > 0) {
        this.showGroupQuizzes(values[0])
      }
    })
  }


  createGroup() {
    this.dialog.open(NuevoGrupoComponent, { height: '250px', width: '420px' })
  }

  showGroupCode(code: string) {
    this.dialog.open(GroupCodeComponent, { height: '225px', width: '420px', data: { code } })
  }

  async showGroupQuizzes(group: Group) {
    let quizzes = await this.firestore.getAllQuizzesByGroup(group.groupId)
    this.cuestionarios = quizzes
    this.group = group

    return null
  }

  startRoom(quizz: Quizz) {
    localStorage.setItem('quizzId', quizz.quizzId)
    localStorage.setItem('quizzName', quizz.name)
    localStorage.setItem('groupId', this.group?.groupId ?? "")
    localStorage.setItem('groupName', this.group?.name ?? "")
    this.router.navigate(['/esperando'])
  }


  signOut() {
    this.auth.signOut();
  }
}
