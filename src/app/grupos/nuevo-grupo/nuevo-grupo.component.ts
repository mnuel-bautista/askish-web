import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from 'src/app/firebase/firestore.service';

@Component({
  selector: 'app-nuevo-grupo',
  templateUrl: './nuevo-grupo.component.html',
  styleUrls: ['./nuevo-grupo.component.css']
})
export class NuevoGrupoComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);


  constructor(private db: FirestoreService, private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  async createGroup() {
    if (this.nameFormControl.value == null) {
      return
    }
    await this.db.createGroup(this.nameFormControl.value)
    alert("Se ha creado el grupo")
    this.dialog.closeAll();
  }
}
