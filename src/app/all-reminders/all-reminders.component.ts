import { Component, OnInit } from '@angular/core';
import { Reminder } from './reminder/reminder.model';
import { RemindersService } from '../services/reminders.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-all-reminders',
  templateUrl: './all-reminders.component.html',
  styleUrls: ['./all-reminders.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class AllRemindersComponent implements OnInit {
  reminders: Reminder[] = [];

  constructor(private remindersService: RemindersService) {
    this.reminders = this.remindersService.getReminders();
  }

  ngOnInit(): void {
    setInterval(() => {
      this.reminders = this.remindersService.reminders;
    }, 500);
  }

  addNew(): void {
    this.remindersService.addNew();
  }
}
