import { Note } from './note/note.model';
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-all-notes',
  templateUrl: './all-notes.component.html',
  styleUrls: ['./all-notes.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class AllNotesComponent implements OnInit {
  notes: Note[] = [];
  firstLoad = true;
  empty: boolean;
  showAll = true;

  constructor(private notesService: NotesService) {
    // this.notesService.getNotes().subscribe((data: Note[]) => {
    //   this.notes = data;
    //   this.sortByPin();
    //   // console.log(this.notes);
    // });
  }

  sortByPin(): void {
    this.notes.forEach((note, i): void => {
      if (note.pinned) {
        this.notes.splice(i, 1);
        this.notes.unshift(note);
      }
    });
  }

  ngOnInit(): void {
    setInterval(() => {
      if (this.showAll) {
        this.notes = this.notesService.notes;
      }

      if (this.firstLoad) {
        this.sortByPin();
        this.firstLoad = false;
      }
      if (this.notes.length === 0) {
        this.empty = true;
      } else {
        this.empty = false;
      }
    }, 500);
  }

  addNew(): void {
    this.notesService.addNew();
    this.empty = false;
  }

  showPinned(val: string): void {
    if (val === 'pin') {
      this.showAll = false;
    } else {
      this.showAll = true;
    }
    if (this.showAll) {
      this.notes = this.notesService.notes;
    } else {
      this.notes = this.notes.filter(({ pinned }) => pinned === true);
    }
  }
}
