import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteComponent } from './note/note.component';

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes : NoteComponent[] = [];
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
    let id = this.counter;
    let newNote = new NoteComponent(this);
    this.notes.push(newNote);
    console.log(newNote);
  }

  getCounter(){
    return this.counter;
  }

  getNotes() {
    return this.notesObs;
  }

  deleteNote(targetId: any): void {
    this.notes = this.notes.filter(({id}) => id != targetId);      
    // send data on update
  }

  pinNote(param: any): void {
    //
  }
}