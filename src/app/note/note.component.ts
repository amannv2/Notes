import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css'],
})
export class NoteComponent implements OnInit {
  title = '';
  content = 'Click edit to add content';
  public Editor = ClassicEditor;
  editMode = false;
  editBtn = 'Edit';
  @ViewChild('myEditor') myEditor: any;

  constructor() {}

  ngOnInit(): void {}

  onEdit(): void {
    this.editMode = !this.editMode;
    if (this.editBtn === 'Edit') {
      this.editBtn = 'Save';
    } else {
      this.editBtn = 'Edit';
      if (this.myEditor && this.myEditor.editorInstance) {
        this.content = this.myEditor.editorInstance.getData();
      }
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
