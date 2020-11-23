import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogBoxComponent } from '../shared/dialog-box/dialog-box.component';

@Injectable()
export class ConfirmDialogService {
  constructor(private dialog: MatDialog) {}
  dialogRef: MatDialogRef<DialogBoxComponent>;

  public open(options): void {
    this.dialogRef = this.dialog.open(DialogBoxComponent, {
      data: {
        title: options.title,
        message: options.message,
        cancelText: options.cancelText,
        confirmText: options.confirmText,
        accent: options.accent,
      },
    });
  }
  public confirmed(): Observable<any> {
    return this.dialogRef.afterClosed().pipe(
      take(1),
      map((res) => {
        return res;
      })
    );
  }
}
