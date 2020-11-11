import { trigger, transition, style, animate } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { NotesService } from '../notes.service';

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
  title = 'Notes';
  notes: NoteComponent[] = [];
  opened = false;

  constructor(private notesService: NotesService) {
    // this.notes = this.notesService.getNotes();
    this.notesService.getNotes().subscribe((data) => {
      this.notes = data;
    });
  }

  ngOnInit(): void {
    setInterval(() => {
      this.notes = this.notesService.notes;
    }, 300);
  }

  addNew(): void {
    this.notesService.addNew();
  }
  showSideBar(): void {
    this.opened = !this.opened;
  }
}
