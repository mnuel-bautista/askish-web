import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
// import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { AuthService } from 'src/app/auth.service';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  passwordControl = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    
  }

  login() {
    let email = this.emailFormControl.value;
    let password = this.passwordControl.value;

    if (email != null && password != null) {
      this.auth.login(email, password)
    }
  }

}
