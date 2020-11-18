import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Note } from '../all-notes/note/note.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class NotesService {
  notes: Note[] = [];

  constructor(private httpService: HttpService, private snackBar: MatSnackBar) {
    this.httpService.sendGetRequest('/notes').subscribe((data: Note[]) => {
      this.notes = data;
    });
  }

  generateSnack(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  updateNote(note: Note): Observable<{}> {
    const id = note.id;

    return this.httpService.sendPatchRequest(
      '/note/' + id,
      JSON.stringify(note)
    );
  }

  addNew(): void {
    this.notes.push(new Note(0, '', '', '#0e9aa7', false, false));

    const body = this.notes[this.notes.length - 1];
    this.httpService
      .sendPostRequest('/notes', JSON.stringify(body))
      .subscribe((data: any) => {
        this.notes[this.notes.length - 1].id = data._id;
        this.updateNote(body).subscribe((res: any) => {
          // console.log(res);
        });
      });
  }

  getNotes(): Observable<{}> {
    return this.httpService.sendGetRequest('/notes');
  }

  deleteNote(targetId: any): void {
    this.notes = this.notes.filter(({ id }) => id !== targetId);
    this.httpService
      .sendDeleteRequest('/note/' + targetId)
      .subscribe((data: any) => {
        this.generateSnack('Note Deleted!', 'OK');
      });
  }

  array_move(arr: any[], oldIndex: number, newIndex: number): void {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  }

  setTitle(targetId: number, title: string): void {
    this.notes.forEach((element) => {
      if (element.id === targetId) {
        element.title = title;
        this.updateNote(element).subscribe((data: any) => {
          // console.log(data);
        });
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
        this.updateNote(element).subscribe((data: any) => {
          // console.log(data);
        });
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
        this.updateNote(element).subscribe((data: any) => {
          // console.log(data);
        });
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
        this.updateNote(element).subscribe((data: any) => {
          // console.log(data);
        });
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
        this.updateNote(element).subscribe((data: any) => {
          // console.log(data);
        });
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

  pinNote(targetId: any, status: boolean): void {
    this.setPin(targetId, status);

    // reshuffle array
    if (!status) {
      let from: number;
      let to: number;

      for (let index = 0; index < this.notes.length; index++) {
        if (this.notes[index].id === targetId) {
          from = index;
          break;
        }
      }

      if (from === this.notes.length - 1) {
        to = this.notes.length - 1;
      } else {
        for (let index = from + 1; index < this.notes.length; index++) {
          if (this.notes[index].pinned === false) {
            to = index;
            console.log(index);

            if (index > 0) {
              to--;
            }
            break;
          } else {
            to = this.notes.length - 1;
          }
        }
      }

      this.array_move(this.notes, from, to);
    } else {
      this.notes.forEach((note, i): void => {
        if (note.id === targetId) {
          this.notes.splice(i, 1);
          this.notes.unshift(note);
        }
      });
    }
  }
}
