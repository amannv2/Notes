import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.component.css'],
})
export class DialogBoxComponent implements OnInit {
  accent: string;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cancelText: string;
      confirmText: string;
      message: string;
      title: string;
      accent: string;
    },
    private mdDialogRef: MatDialogRef<DialogBoxComponent>
  ) {}

  public cancel(): void {
    this.close(false);
  }

  public close(value): void {
    this.mdDialogRef.close(value);
  }

  public confirm(): void {
    this.close(true);
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.close(false);
  }

  ngOnInit(): void {
    if (this.data.accent === undefined) {
      this.accent = 'warn';
    } else {
      this.accent = this.data.accent;
    }
  }
}
