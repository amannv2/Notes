import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule, MatIconModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import { AppComponent } from './app.component';
import { NoteComponent } from './note/note.component';

@NgModule({
  declarations: [AppComponent, NoteComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    CKEditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
