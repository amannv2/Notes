import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuardService } from '../services/auth-guard.service';

import { DrawComponent } from '../draw/draw.component';
import { HomeComponent } from '../home/home.component';
import { AllNotesComponent } from '../all-notes/all-notes.component';
import { NotFoundComponent } from '../error/not-found/not-found.component';
import { AllRemindersComponent } from '../all-reminders/all-reminders.component';
import { ServerDownComponent } from '../error/server-down/server-down.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'notes',
    canActivate: [AuthGuardService],
    component: AllNotesComponent,
  },
  { path: 'draw', canActivate: [AuthGuardService], component: DrawComponent },
  {
    path: 'reminders',
    canActivate: [AuthGuardService],
    component: AllRemindersComponent,
  },
  { path: 'draw', canActivate: [AuthGuardService], component: DrawComponent },
  {
    path: 'logout',
    canActivate: [AuthGuardService],
    component: HomeComponent,
  },
  {
    path: 'maintenance',
    component: ServerDownComponent,
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
  },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
