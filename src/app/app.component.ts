import { Component, OnInit } from '@angular/core';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Notes';

  notes = [];

  ngOnInit(): void {
    this.notes.push(new NoteComponent());
  }

  addNew(): void {
    this.notes.push(new NoteComponent());
  }
}
