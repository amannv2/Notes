import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';

import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

import { QuillModule } from 'ngx-quill';
import { environment } from '../environments/environment';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

import { NotesService } from './notes.service';
import { RemindersService } from './reminders.service';
import { PushNotificationsService } from './notification.service';

import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import { NoteComponent } from './all-notes/note/note.component';
import { AllNotesComponent } from './all-notes/all-notes.component';
import { AllRemindersComponent } from './all-reminders/all-reminders.component';
import { ReminderComponent } from './all-reminders/reminder/reminder.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const appRoutes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: AllNotesComponent },
  { path: 'draw', component: DrawComponent },
  { path: 'reminders', component: AllRemindersComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [
    AppComponent,
    NoteComponent,
    DrawComponent,
    AllNotesComponent,
    ReminderComponent,
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
    MatSelectModule,
    MatButtonModule,
    MatSidenavModule,
    MatTooltipModule,
    HttpClientModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    CanvasWhiteboardModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
  ],
  providers: [
    NotesService,
    RemindersService,
    PushNotificationsService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
