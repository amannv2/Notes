import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RemindersService } from './services/reminders.service';
import { AuthServiceService } from './services/auth-service.service';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  title = 'Notes';
  opened = false;
  uname = this.authService.getUsername();

  constructor(
    private reminderService: RemindersService,
    private authService: AuthServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loggedIn(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    }
    return false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/', 'home']);
  }

  getUname(): string {
    return this.authService.getUsername();
  }
}
