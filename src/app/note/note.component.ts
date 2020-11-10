import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Injectable, OnInit } from '@angular/core';
import { NotesService } from '../notes.service'
import * as Quill from 'quill';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
  animations: [
    trigger('inOutAnimation', [
      transition(':enter', [
        style({ height: 0, opacity: 0 }),
        animate('0.5s ease-out', style({ height: 0, opacity: 1 })),
      ]),
      transition(':leave', [
        style({ height: 0, opacity: 1 }),
        animate('0.5s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})

export class NoteComponent implements OnInit {
  id = 0;
  title = '';
  content = '';
  locked = true;
  lockBtn = 'lock';
  editor: Quill;
  modules = {};
  activeColor = '#0e9aa7';
  showColors = false;

  // blured = false;
  // focused = false;
  //
  // (onEditorChanged)="changedEditor($event)"
  // changedEditor(event: EditorChangeContent | EditorChangeSelection): void {
  // tslint:disable-next-line:no-console
  // console.log('editor-change', event);
  // }
  //
  // created(event) {
  //   // tslint:disable-next-line:no-console
  //   console.log('editor-created', event);
  // }
  // focus($event) {
  //   // tslint:disable-next-line:no-console
  //   console.log('focus', $event);
  //   this.focused = true;
  //   this.blured = false;
  // }
  //
  // blur($event) {
  //   // tslint:disable-next-line:no-console
  //   console.log('blur', $event);
  //   this.focused = false;
  //   this.blured = true;
  // }

  constructor(private notesService: NotesService) {            
    this.id = this.notesService.getCounter();
    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button

        ['link', 'image'], // link and image
      ],
    };
  }

  ngOnInit(): void {}

  changeNoteColor(hexCode): void {
    this.activeColor = hexCode;
  }

  getColor(): string {
    return this.activeColor;
  }

  onDelete(): void {
    this.notesService.deleteNote(this.id);
  }

  onLock(): void {
    this.locked = !this.locked;
    if (this.lockBtn === 'lock_open') {
      this.lockBtn = 'lock';
    } else {
      this.lockBtn = 'lock_open';
    }
  }
}
