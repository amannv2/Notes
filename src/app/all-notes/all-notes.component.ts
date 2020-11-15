import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NotesService } from '../notes.service';
import { Note } from './note/note.model';

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

  constructor(private notesService: NotesService) {
    this.notes = this.notesService.getNotes();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.notes = this.notesService.notes;
    }, 500);
  }

  addNew(): void {
    this.notesService.addNew();
  }
}
