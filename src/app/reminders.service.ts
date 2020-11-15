import { Injectable } from '@angular/core';
import { Reminder } from './all-reminders/reminder/reminder.model';

@Injectable({ providedIn: 'root' })
export class RemindersService {
  reminders: Reminder[] = [];
  counter = 0;

  constructor() {
    this.addNew();
  }

  addNew(): void {
    this.counter++;
    this.reminders.push(new Reminder(this.counter, 'Test', 'XXXXXX'));
  }

  getCounter(): number {
    return this.counter;
  }

  getReminders(): Reminder[] {
    return this.reminders;
  }

  deleteNote(targetId: any): void {
    // this.notes = this.notes.filter(({ id }) => id !== targetId);
  }

  array_move(arr, oldIndex, newIndex): void {
    if (newIndex >= arr.length) {
      let k = newIndex - arr.length + 1;
      while (k--) {
        arr.push(undefined);
      }
    }
    arr.splice(newIndex, 0, arr.splice(oldIndex, 1)[0]);
  }
}
