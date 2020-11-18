import * as Quill from 'quill';
import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from '../../services/notes.service';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { animate, style, transition, trigger } from '@angular/animations';
import { ConfirmDialogService } from 'src/app/services/confirmDialog.service';

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
        animate('0.3s ease-in', style({ height: 0, opacity: 0 })),
      ]),
    ]),
  ],
})
export class NoteComponent implements OnInit {
  @Input() id: number;
  @Input() title: string;
  @Input() content: string;
  @Input() locked: boolean;
  @Input() pinned: boolean;
  @Input() activeColor: string;
  editor: Quill;
  modules = {};
  showColors = false;
  titlePlaceholder = 'Note Title';
  temp: string;
  pinTooltip = 'Pin note at the top';
  lockTooltip = 'Disable editing';

  // blured = false;
  // focused = false;
  //
  // (onEditorChanged)="changedEditor($event)"
  changedEditor(event: EditorChangeContent | EditorChangeSelection): void {
    if (event.event === 'text-change') {
      this.temp = event.html;
    }
  }

  changeTitle(title: string): void {
    this.notesService.setTitle(this.id, title);
  }
  //
  // created(event) {
  //   // tslint:disable-next-line:no-console
  //   console.log('editor-created', event);
  // }
  // focus($event) {
  // tslint:disable-next-line:no-console
  // console.log('focus', $event);
  // this.focused = true;
  // this.blured = false;
  // }
  //
  blur($event: any): void {
    // tslint:disable-next-line:no-console
    // console.log('blur', this.temp);
    this.notesService.setContent(this.id, this.temp);
    // this.focused = false;
    // this.blured = true;
  }

  constructor(
    private notesService: NotesService,
    private dialogService: ConfirmDialogService
  ) {
    // this.id = this.notesService.getCounter();
    this.modules = {
      toolbar: [
        [{ font: [] }],
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        // ['strike'], // toggled buttons

        [{ align: [] }],
        [{ list: 'ordered' }],
        ['blockquote', 'code-block'],
        // [{ direction: 'rtl' }], // text direction

        ['link', 'image'], // link and image
        [{ color: [] }], // dropdown with defaults from theme

        // ['clean'], // remove formatting button
      ],
    };
  }

  ngOnInit(): void {
    this.content = this.notesService.getContent(this.id);
    this.title = this.notesService.getTitle(this.id);
    this.activeColor = this.notesService.getColor(this.id);
    this.pinned = this.notesService.getPinnedStatus(this.id);
    this.locked = this.notesService.getLockStatus(this.id);
    this.getToolTips();
  }

  getTitlePlaceholder(): string {
    if (this.title.length > 0) {
      return '';
    }
    return 'Note Title';
  }

  changeNoteColor(hexCode: string): void {
    // this.activeColor = hexCode;
    this.notesService.setColor(this.id, hexCode);
  }

  getColor(): string {
    return this.activeColor;
  }

  onDelete(): void {
    const options = {
      title: 'Delete Confirmation',
      message: 'This action is irreversible, do you want to continue?',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        this.notesService.deleteNote(this.id);
      }
    });
  }

  onPin(): void {
    this.pinned = !this.pinned;
    this.notesService.pinNote(this.id, this.pinned);
    this.getToolTips();
  }

  onLock(): void {
    this.locked = !this.locked;
    this.notesService.setLock(this.id, this.locked);
    this.getToolTips();
  }

  getToolTips(): void {
    if (this.locked) {
      this.lockTooltip = 'Enable editing';
    } else {
      this.lockTooltip = 'Disable editing';
    }
    if (this.pinned) {
      this.pinTooltip = 'Unpin note';
    } else {
      this.pinTooltip = 'Pin note at the top';
    }
  }
}
