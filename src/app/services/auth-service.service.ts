import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private cookieService: CookieService) {}

  setCookies(username: string, password: string): void {
    this.clearCookies();
    this.cookieService.set('uname', username, { expires: 30 });
    this.cookieService.set('pass', password, { expires: 30 });
  }

  clearCookies(): void {
    this.cookieService.delete('uname');
    this.cookieService.delete('pass');
  }

  getUsername(): string {
    return this.cookieService.get('uname');
  }

  hashIt(pass: string): string {
    let hash = 0;
    let char: number;
    if (pass.length === 0) {
      return hash.toString();
    }
    for (let i = 0; i < pass.length; i++) {
      char = pass.charCodeAt(i);
      // tslint:disable-next-line: no-bitwise
      hash = (hash << 5) - hash + char;
      // tslint:disable-next-line: no-bitwise
      hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString();
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

  logout(): void {
    this.clearCookies();
  }
}
