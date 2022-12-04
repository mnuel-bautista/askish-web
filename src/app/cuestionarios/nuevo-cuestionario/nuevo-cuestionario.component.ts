import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, TitleStrategy } from '@angular/router';
import { Answers } from 'src/app/models/quizz.model';
import { CuestionariosService } from 'src/app/services/cuestionarios.service';

@Component({
  selector: 'app-nuevo-cuestionario',
  templateUrl: './nuevo-cuestionario.component.html',
  styleUrls: ['./nuevo-cuestionario.component.css']
})
export class NuevoCuestionarioComponent implements OnInit {

  nameFormControl = new FormControl('', [Validators.required]);

  groupFormControl = new FormControl('', [Validators.required]);

  showQuestions: boolean = false

  quizzDocumentId: string | null = null;

  groupDocumentId: string | null = null; 

  questionFormControl = new FormControl('', [Validators.required]);

  aFormControl = new FormControl('', [Validators.required]);

  bFormControl = new FormControl('', [Validators.required]);

  cFormControl = new FormControl('', [Validators.required]);

  dFormControl = new FormControl('', [Validators.required]);

  descriptionFormControl = new FormControl('', [Validators.required]);

  answers = { a: "Respuesta A", b: "respuesta B", c: "Respuesta C", d: "Respuesta D" }

  answersEntries = Object.entries(this.answers);

  correctAnswer = new FormControl('')

  constructor(private service: CuestionariosService, private router: Router) { }

  ngOnInit(): void {
  }


  async createQuizz() {
    let name = this.nameFormControl.value ?? ""
    let group = this.groupFormControl.value ?? ""
    let res = await this.service.createQuizz(group, name)
    this.quizzDocumentId = res.quizzId;
    this.groupDocumentId = res.groupId;

    this.showQuestions = true
  }

  async finishQuizz() {
    await this.addQuestion()
    this.router.navigate(['../grupos'])
  }

  async addQuestion() {
    let question = this.questionFormControl.value ?? "";
    let description = this.descriptionFormControl.value ?? "";
    let correctAnswer = this.correctAnswer.value ?? "";

    let answers = <Answers>{
      a: this.aFormControl.value ?? "",
      b: this.bFormControl.value ?? "", 
      c: this.cFormControl.value ?? "", 
      d: this.dFormControl.value ?? "", 
    } 

    let qt = { questionId: "", question, description, correctAnswer, answers }; 

    await this.service.addQuestion(this.groupDocumentId ?? "", this.quizzDocumentId ?? "", qt)

    this.questionFormControl.setValue('');
    this.questionFormControl.setErrors(null)
    this.aFormControl.setValue('');  
    this.aFormControl.setErrors(null)
    this.bFormControl.setValue('');  
    this.bFormControl.setErrors(null)
    this.cFormControl.setValue('');  
    this.cFormControl.setErrors(null)
    this.dFormControl.setValue('');  
    this.dFormControl.setErrors(null)
    this.descriptionFormControl.setValue('');  
    this.descriptionFormControl.setErrors(null)
    this.correctAnswer.setValue('');  
  }

}
