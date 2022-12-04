import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login/login.component';
import { NuevoCuestionarioComponent } from './cuestionarios/nuevo-cuestionario/nuevo-cuestionario.component';
import { GruposComponent } from './grupos/grupos.component';
import { UserAuthenticatedGuard } from './guards/user-authenticated.guard';
import { QuizzRoomComponent } from './quizzes/quizz-room/quizz-room.component';
import { SignupComponent } from './signup/signup.component';
import { WaitingParticipantsComponent } from './waiting-participants/waiting-participants.component';

const routes: Routes = [
  { path: '', redirectTo: '/grupos', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'grupos', component: GruposComponent, canActivate: [UserAuthenticatedGuard] },
  { path: 'cuestionarios/crear', component: NuevoCuestionarioComponent },
  { path: 'esperando', component: WaitingParticipantsComponent }, 
  { path: "sala", component: QuizzRoomComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
