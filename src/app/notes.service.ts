import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteComponent } from './note/note.component';

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes: NoteComponent[] = [];
  counter = 0;
  notesObs: Observable<NoteComponent[]>;

  constructor() {
    this.addNew();
    this.notesObs = new Observable((observer) => {
      observer.next(this.notes);
    });
  }

  addNew(): void {
    this.counter++;
    const newNote = new NoteComponent(this);
    this.notes.push(newNote);
    // console.log(newNote);
  }

  getCounter(): number {
    return this.counter;
  }

  getNotes(): Observable<NoteComponent[]> {
    return this.notesObs;
  }

  deleteNote(targetId: any): void {
    this.notes = this.notes.filter(({ id }) => id !== targetId);
    // send data on update
  }

  pinNote(targetId: any): void {
    this.notes.forEach((note, i): void => {
      if (note.id === targetId) {
        this.notes.splice(i, 1);
        this.notes.unshift(note);
      }
    });
  }
}
