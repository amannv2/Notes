import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatCheckboxModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule,
  MatTabsModule,
} from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CanvasWhiteboardModule } from 'ng2-canvas-whiteboard';
import { QuillModule } from 'ngx-quill';
import { AppComponent } from './app.component';
import { DrawComponent } from './draw/draw.component';
import { NoteComponent } from './all-notes/note/note.component';
import { NotesService } from './notes.service';
import { AllNotesComponent } from './all-notes/all-notes.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'notes', pathMatch: 'full' },
  { path: 'notes', component: AllNotesComponent },
  { path: 'draw', component: DrawComponent },
  { path: '**', redirectTo: 'not-found' },
];

@NgModule({
  declarations: [AppComponent, NoteComponent, DrawComponent, AllNotesComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    CanvasWhiteboardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    QuillModule.forRoot(),
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    NotesService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
