import { Router } from '@angular/router';
import { Note } from './note/note.model';
import { FormControl } from '@angular/forms';
import { ApplicationRef, Component, OnInit } from '@angular/core';
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
  showAll = true;
  filter = false;
  empty: boolean;
  firstLoad = true;
  showPinned = true;
  isSyncing = true;
  serverDown: boolean;
  showArchived = false;
  colors = new FormControl();
  colorList = [
    { value: 'Black', code: '#4a4e4d' },
    { value: 'Blue', code: '#0e9aa7' },
    { value: 'Cyan', code: '#3da4ab' },
    { value: 'Yellow', code: '#f6cd61' },
    { value: 'Orange', code: '#fe8a71' },
    { value: 'Red', code: '#ec524b' },
  ];

  constructor(
    private notesService: NotesService,
    private router: Router,
    private appRef: ApplicationRef
  ) {
    this.notesService.getNotes().subscribe((data: []) => {
      this.notes = data;
      this.showAllNotes();
      this.appRef.tick();
      this.isSyncing = false;
      this.appRef.tick();
      // this.loadNotes();
    });
    // setTimeout(() => {
    //   this.showAllNotes();
    //   setTimeout(() => {
    //     this.isSyncing = false;
    //   }, 400);
    // }, 600);
  }

  loadNotes(): void {
    if (this.notesService.serverDown) {
      // this.router.navigate(['/maintenance']);
      alert('Server down');
    }

    if (
      this.showAll &&
      !this.filter &&
      !this.showPinned &&
      !this.showArchived
    ) {
      this.notes = this.notesService.notes.filter(
        ({ archived }) => archived !== true
      );
    }

    if (this.showArchived) {
      this.notes = this.notesService.notes.filter(
        ({ archived }) => archived === true
      );
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
    this.showAllNotes();
  }

  addNew(): void {
    this.notesService.addNew();
    this.empty = false;
    this.loadNotes();
  }

  showAllNotes(): void {
    this.showAll = true;
    this.showPinned = false;
    this.showArchived = false;
    this.notes = this.notesService.notes;
    this.loadNotes();
    this.appRef.tick();
  }

  showArchivedNotes(): void {
    this.showAll = false;
    this.showPinned = false;
    this.showArchived = true;
    this.notes = this.notesService.notes.filter(
      ({ archived }) => archived === true
    );
    if (this.notes.length === 0) {
      this.empty = true;
    }
  }

  showPinnedNotes(): void {
    this.showAll = false;
    this.showPinned = true;
    this.showArchived = false;
    this.notes = this.notes.filter(({ pinned }) => pinned === true);
    if (this.notes.length === 0) {
      this.empty = true;
    }
  }

  filterByColors(): void {
    if (this.colors.value.length === 0) {
      this.filter = false;
      this.loadNotes();
    } else {
      this.filter = true;

      this.notes = this.notesService.notes.filter(
        ({ color, archived }) => this.colors.value.includes(color) && !archived
      );
    }
  }

  onSync(): void {
    this.isSyncing = true;
    this.notes.forEach((note) => {
      this.notesService.updateNote(note);
    });
    this.isSyncing = false;
    // setTimeout(() => {
    // }, 3000);
  }

  updateNotes(event: any): void {
    this.loadNotes();
  }
}
