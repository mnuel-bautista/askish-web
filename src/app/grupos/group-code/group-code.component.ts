import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-group-code',
  templateUrl: './group-code.component.html',
  styleUrls: ['./group-code.component.css']
})
export class GroupCodeComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: {code: string}) { }

  ngOnInit(): void {
  }

  copyToClipboard() {
    navigator.clipboard.writeText(this.data.code)
  }

}
