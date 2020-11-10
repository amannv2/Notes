import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import * as Quill from 'quill';
@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  title = '';
  content = '';
  locked = true;
  lockBtn = 'lock';
  editor: Quill;
  modules = {};

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

  constructor() {
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

  onLock(): void {
    this.locked = !this.locked;
    if (this.lockBtn === 'lock_open') {
      this.lockBtn = 'lock';
    } else {
      this.lockBtn = 'lock_open';
    }
  }
}
