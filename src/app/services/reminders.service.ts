import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { CookieService } from 'ngx-cookie-service';
import { AuthServiceService } from './auth-service.service';
import { Reminder } from '../all-reminders/reminder/reminder.model';

@Injectable({ providedIn: 'root' })
export class RemindersService {
  reminders: Reminder[] = [];
  counter = 0;
  readonly owner = this.authService.getUsername();

  constructor(
    private httpService: HttpService,
    private cookieService: CookieService,
    private authService: AuthServiceService
  ) {
    if (typeof Worker !== 'undefined') {
      // Create a new
      const worker = new Worker('../reminder.worker', { type: 'module' });
      worker.onmessage = ({ data }) => {
        console.log(`page got message: ${data}`);
      };
      worker.postMessage(this.reminders);
    } else {
      // Web workers are not supported in this environment.
      // You should add a fallback so that your program still executes correctly.
      alert(
        // tslint:disable-next-line: quotemark
        "Web Workers are not supported in this environment. Reminders won't work"
      );
    }

    // retrieve all reminders
    const body = {
      pass: this.authService.getSecret(),
    };
    this.httpService
      .sendPostRequest('/reminders/' + this.owner, JSON.stringify(body))
      .subscribe((data: any) => {
        this.reminders = data;
        // console.log(this.reminders);
      });
  }

  addNew(): void {
    this.reminders.push(new Reminder('0', '', new Date(), this.owner));

    const body = {
      reminder: this.reminders[this.reminders.length - 1],
      pass: this.authService.getSecret(),
    };
    const user = this.authService.getUsername();

    this.httpService
      .sendPostRequest('/reminder/' + user, JSON.stringify(body))
      .subscribe((data: any) => {
        this.reminders[this.reminders.length - 1].id = data._id;
        // console.log(this.reminders[this.reminders.length - 1]);
      });
  }

  updateReminder(id: string, content: string, time: Date): void {
    let target: Reminder;

    this.reminders.forEach((element) => {
      if (element.id === id) {
        element.content = content;
        element.time = time;
        target = element;
      }
    });

    const body = {
      reminder: this.reminders[this.reminders.length - 1],
      pass: this.authService.getSecret(),
    };

    this.httpService
      .sendPostRequest('/reminder/' + this.owner, JSON.stringify(body))
      .subscribe((data: any) => {});
  }

  deleteReminder(targetId: any): void {
    // this.notes = this.notes.filter(({ id }) => id !== targetId);
  }
}
