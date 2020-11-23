import { Router } from '@angular/router';
import { Note } from './note/note.model';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../services/notes.service';
import { animate, style, transition, trigger } from '@angular/animations';

const colorCode = {
  Black: '#4a4e4d',
  Blue: '#0e9aa7',
  Cyan: '#3da4ab',
  Yellow: '#f6cd61',
  Orange: '#fe8a71',
  Red: '#ec524b',
};

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
  filter = false;
  colors = new FormControl();
  serverDown: boolean;
  colorList = [
    { value: 'Black', code: '#4a4e4d' },
    { value: 'Blue', code: '#0e9aa7' },
    { value: 'Cyan', code: '#3da4ab' },
    { value: 'Yellow', code: '#f6cd61' },
    { value: 'Orange', code: '#fe8a71' },
    { value: 'Red', code: '#ec524b' },
  ];

  constructor(private notesService: NotesService, private router: Router) {
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
      if (this.notesService.serverDown) {
        this.router.navigate(['/maintenance']);
      }

      if (this.showAll && !this.filter) {
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

  filterByColors(): void {
    if (this.colors.value.length === 0) {
      this.filter = false;
    } else {
      this.filter = true;

      this.notes = this.notes.filter(({ color }) =>
        this.colors.value.includes(color)
      );
    }
  }
}
