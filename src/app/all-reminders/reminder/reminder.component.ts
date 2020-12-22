import { FormControl } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { RemindersService } from 'src/app/services/reminders.service';

const date = new Date();

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
})
export class ReminderComponent implements OnInit {
  @Input() id: string;
  @Input() content: string;
  @Input() fullTime: Date;
  dateControl: FormControl;

  constructor(private reminderService: RemindersService) {
    console.log(this.fullTime);
    this.dateControl = new FormControl(this.fullTime);
  }

  ngOnInit(): void {}

  saveReminder(): void {
    console.log(this.id);
    console.log('-------------------------');
    console.log(this.content);
    console.log('-------------------------');
    console.log(this.dateControl.value);

    this.reminderService.updateReminder(
      this.id,
      this.content,
      this.dateControl.value
    );
  }
}
