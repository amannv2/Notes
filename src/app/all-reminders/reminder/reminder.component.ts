import { Component, Input, OnInit } from '@angular/core';
interface Hour {
  value: number;
}
interface Minute {
  value: number;
}
@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.css'],
})
export class ReminderComponent implements OnInit {
  @Input() id: number;
  @Input() content: string;
  @Input() time: string;
  remHour: string;
  remMin: string;
  am = true;
  pm = false;
  hours: Hour[] = [];
  mins: Minute[] = [];

  ngOnInit(): void {
    for (let index = 1; index < 60; index++) {
      if (index <= 12) {
        this.hours.push({ value: index });
      }
      this.mins.push({ value: index });
    }
  }

  setAmPm(): void {
    this.pm = !this.pm;
    this.am = !this.am;
  }

  setHour(hour: string): void {
    this.remHour = hour;
    console.log(hour);
  }

  setMin(min: string): void {
    this.remMin = min;
  }

  saveReminder(): void {
    console.log(this.id);
    console.log(this.content);
    console.log(this.remHour);
    console.log(this.remMin);
    console.log(this.am);
    console.log(this.pm);
  }
}
