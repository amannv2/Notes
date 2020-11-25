import * as Quill from 'quill';
import { NotesService } from '../../services/notes.service';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill';
import { animate, style, transition, trigger } from '@angular/animations';
import { ConfirmDialogService } from 'src/app/services/confirmDialog.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Input() archived: boolean;
  @Input() activeColor: string;

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  editor: Quill;
  modules = {};
  temp: string;
  showColors = false;
  titlePlaceholder = 'Note Title';
  pinTooltip = 'Pin note at the top';
  archiveTooltip = 'Archive note';
  lockTooltip = 'Disable editing';

  constructor(
    private notesService: NotesService,
    private dialogService: ConfirmDialogService
  ) {
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
    this.archived = this.notesService.getArchivedStatus(this.id);
    this.getToolTips();
  }

  changedEditor(event: EditorChangeContent | EditorChangeSelection): void {
    if (event.event === 'text-change') {
      this.temp = event.html;
    }

    if (this.showColors) {
      this.showColors = false;
    }
  }

  changeTitle(title: string): void {
    this.notesService.setTitle(this.id, title);
  }

  blur($event: any): void {
    // tslint:disable-next-line:no-console
    if (this.temp !== undefined) {
      this.notesService.setContent(this.id, this.temp);
    }

    if (this.showColors) {
      this.showColors = false;
    }
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
        this.notifyParent.emit();
      }
    });
  }

  onPin(): void {
    this.pinned = !this.pinned;
    this.notesService.pinNote(this.id, this.pinned);
    this.notifyParent.emit();
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
    if (this.archived) {
      this.archiveTooltip = 'Unarchive Note';
    } else {
      this.archiveTooltip = 'Archive note';
    }
  }

  onArchive(): void {
    this.archived = !this.archived;
    this.pinned = false;
    this.notesService.archiveNote(this.id, this.archived, this.pinned);
    this.getToolTips();
    this.notifyParent.emit();
  }
}
