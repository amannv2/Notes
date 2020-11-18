import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private cookieService: CookieService) {}

  setCookies(username: string, password: string): void {
    this.cookieService.set('uname', username, { expires: 30 });
    this.cookieService.set('pass', password, { expires: 30 });
  }

  isLoggedIn(): boolean {
    if (
      this.cookieService.get('uname').length > 0 &&
      this.cookieService.get('pass').length > 0
    ) {
      return true;
    }
    return false;
  }
}
