import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ServiceWorkerModule } from '@angular/service-worker';

import { QuillModule } from 'ngx-quill';
import { environment } from '../environments/environment';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';

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

import { CookieService } from 'ngx-cookie-service';

import { HttpService } from './services/http.service';
import { NotesService } from './services/notes.service';
import { EnvServiceProvider } from './env.service.provider';
import { RemindersService } from './services/reminders.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthServiceService } from './services/auth-service.service';
import { ConfirmDialogService } from './services/confirmDialog.service';
import { PushNotificationsService } from './services/notification.service';

import { AppRoutingModule } from './modules/app-routing.module';
import { AppMaterialModule } from './modules/app-material.module';

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
    HttpClientModule,
    AppRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule,
    CanvasWhiteboardModule,
    BrowserAnimationsModule,
    QuillModule.forRoot(),
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
    EnvServiceProvider,
    ConfirmDialogService,
    PushNotificationsService,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
