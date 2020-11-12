import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteComponent } from './all-notes/note/note.component';
import { Note } from './all-notes/note/note.model';

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes: Note[] = [];
  counter = 0;
  // notesObs: Observable<Note[]>;

  constructor() {
    this.addNew();
    // this.notesObs = new Observable((observer) => {
    //   observer.next(this.notes);
    // });
  }

  addNew(): void {
    this.counter++;
    this.notes.push(new Note(this.counter, '', '', '#0e9aa7', false, false));
  }

  getCounter(): number {
    return this.counter;
  }

  // subToNotes(): Observable<Note[]> {
  //   return this.notesObs;
  // }

  getNotes(): Note[] {
    return this.notes;
  }

  deleteNote(targetId: any): void {
    this.notes = this.notes.filter(({ id }) => id !== targetId);
    console.log(this.notes);
  }

  pinNote(targetId: any, status: boolean): void {
    this.setPin(targetId, status);
    this.notes.forEach((note, i): void => {
      if (note.id === targetId) {
        this.notes.splice(i, 1);
        this.notes.unshift(note);
      }
    });
  }

  setTitle(targetId: number, title: string): void {
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        element.title = title;
      }
    });
  }

  getTitle(targetId: number): string {
    let title = '';
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        title = element.title;
      }
    });
    return title;
  }

  setContent(targetId: number, content: string): void {
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        element.content = content;
      }
    });
  }

  getContent(targetId: number): string {
    let content = '';
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        content = element.content;
      }
    });
    return content;
  }

  setColor(targetId: number, color: string): void {
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        element.color = color;
      }
    });
  }

  getColor(targetId: number): string {
    let color = '#0e9aa7';
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        color = element.color;
      }
    });
    return color;
  }

  setLock(targetId: number, status: boolean): void {
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        element.locked = status;
      }
    });
  }

  getLockStatus(targetId: number): boolean {
    let status = false;
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        status = element.locked;
      }
    });
    return status;
  }

  setPin(targetId: number, status: boolean): void {
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        element.pinned = status;
      }
    });
  }

  getPinnedStatus(targetId: number): boolean {
    let status = false;
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        status = element.pinned;
      }
    });
    return status;
  }
}
