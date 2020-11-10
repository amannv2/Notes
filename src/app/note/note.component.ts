import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Editor from 'src/assets/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  title = '';
  content = 'Click edit to add content';
  public Editor = Editor;
  editMode = false;
  editBtn = 'Edit';

  @ViewChild('myEditor') myEditor: any;

  EditorConfig = {
    toolbar: {
      items: ['bold', 'italic', 'underline', 'link'],
    },
    // This value must be kept in sync with the language defined in webpack.config.js.
    language: 'en',
  };

  constructor() {}

  ngOnInit(): void {}

  onEdit(): void {
    this.editMode = !this.editMode;
    if (this.editBtn === 'Edit') {
      this.editBtn = 'Save';
    } else {
      this.editBtn = 'Edit';
      // if (this.myEditor && this.myEditor.editorInstance) {
      //   this.content = this.myEditor.editorInstance.getData();
      // }
    }
  }
  onCancel(): void {
    this.editMode = !this.editMode;
    if (this.editBtn === 'Edit') {
      this.editBtn = 'Save';
    } else {
      this.editBtn = 'Edit';
    }
  }
}
