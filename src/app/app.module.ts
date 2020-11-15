import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatIconModule,
  MatListModule,
  MatTabsModule,
  MatSelectModule,
  MatTooltipModule,
  MatSidenavModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatDatepickerModule,
  MatButtonToggleModule,
} from '@angular/material';
import { QuillModule } from 'ngx-quill';
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
    MatCheckboxModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    CanvasWhiteboardModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
    RouterModule.forRoot(appRoutes),
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
