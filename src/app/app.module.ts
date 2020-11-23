import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatNativeDateModule } from '@angular/material/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { QuillModule } from 'ngx-quill';
import { environment } from '../environments/environment';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

import { CookieService } from 'ngx-cookie-service';
import { HttpService } from './services/http.service';
import { NotesService } from './services/notes.service';
import { RemindersService } from './services/reminders.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServiceService } from './services/auth-service.service';
import { ConfirmDialogService } from './services/confirmDialog.service';
import { PushNotificationsService } from './services/notification.service';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import { HomeComponent } from './home/home.component';
import { NoteComponent } from './all-notes/note/note.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { DialogBoxComponent } from './shared/dialog-box/dialog-box.component';
import { AllRemindersComponent } from './all-reminders/all-reminders.component';
import { ReminderComponent } from './all-reminders/reminder/reminder.component';
import { ServerDownComponent } from './error/server-down/server-down.component';

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
  declarations: [
    AppComponent,
    NoteComponent,
    DrawComponent,
    HomeComponent,
    NotFoundComponent,
    AllNotesComponent,
    ReminderComponent,
    DialogBoxComponent,
    ServerDownComponent,
    AllRemindersComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatSidenavModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonToggleModule,
    CanvasWhiteboardModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  entryComponents: [DialogBoxComponent],
  providers: [
    HttpService,
    NotesService,
    CookieService,
    RemindersService,
    AuthGuardService,
    AuthServiceService,
    ConfirmDialogService,
    PushNotificationsService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
