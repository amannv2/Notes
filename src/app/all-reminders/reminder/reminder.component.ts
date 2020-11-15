import { Component, Input, OnInit } from '@angular/core';

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
  hours = [];
  mins = [];

  // constructor(private pushNotifications: PushNotificationsService) {
  //   this.pushNotifications.requestPermission();
  // }

  notify(): void {
    // our function to be called on click
    const options = {
      // set options
      body: 'The truth is, I am Iron Man!',
      icon: 'assets/images/bell.png', // adding an icon
    };
    // this.pushNotifications.create('Iron Man', options).subscribe(
    //   // creates a notification
    //   (res: any) => console.log(res),
    //   (err: any) => console.log(err)
    // );
  }

  ngOnInit(): void {
    for (let index = 1; index < 60; index++) {
      if (index <= 12) {
        this.hours.push(index);
      }
      this.mins.push(index);
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
