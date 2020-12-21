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
    setInterval(() => {
      this.reminders = this.remindersService.reminders;
      console.log(this.reminders);
    }, 500);
    // this.remindersService.getReminders().subscribe((data: Reminder[]) => {
    //   this.reminders = data;
    // });
  }

  ngOnInit(): void {
    // const audio = new Audio();
    // audio.src = '../assets/sounds/alert.mp3';
    // audio.load();
    // audio.play();
  }

  addNew(): void {
    this.remindersService.addNew();
  }
}
