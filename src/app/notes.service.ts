import { Injectable } from '@angular/core';
import { NoteComponent } from './note/note.component';

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes = [];

  constructor() {
    this.addNew();
  }

  addNew(): void {
    this.notes.push(new NoteComponent());
  }

  getNotes(): NoteComponent[] {
    return this.notes;
  }

  deleteNote(param: any): void {
    // some code
  }

  pinNote(param: any): void {
    //
  }
}
