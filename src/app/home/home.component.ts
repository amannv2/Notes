import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { AuthServiceService } from '../services/auth-service.service';
import { ConfirmDialogService } from '../services/confirmDialog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  hide = true;
  username: string;
  password: string;
  activeColor = '#4a4e4d';
  showColors = false;
  showPass = false;
  showNext = false;
  nextText = 'Next';
  newUser: boolean;
  loggingIn = false;

  constructor(
    private dialogService: ConfirmDialogService,
    private authService: AuthServiceService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/', 'notes']);
    }
    this.setDivHeight('28vh');
  }

  changeNoteColor(hexCode: string): void {
    this.activeColor = hexCode;
  }

  getColor(): string {
    return this.activeColor;
  }

  onDelete(): void {
    const options = {
      title: 'Seriously?',
      message: 'This makes no sense, why would you do that?',
      cancelText: 'Umm..',
      confirmText: ':(',
      accent: 'accent',
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe((confirmed) => {
      if (confirmed) {
        //
      }
    });
  }

  onPin(): void {
    const options = {
      title: 'Message',
      message: 'I am already pinned on this page, you dum-dum!',
      cancelText: 'Sorry',
      confirmText: 'So, Sorry!',
      accent: 'accent',
    };
    this.dialogService.open(options);
  }

  onLock(): void {
    const options = {
      title: 'Message',
      message: 'Lock what? Your credentials?',
      cancelText: 'Sorry',
      // tslint:disable-next-line: quotemark
      confirmText: "I won't do it again",
      accent: 'accent',
    };
    this.dialogService.open(options);
  }

  setDivHeight(value: string): void {
    const growDiv = document.getElementById('grow');
    if (growDiv.clientHeight) {
      growDiv.style.height = value;
    }
  }

  getUsername(username: string): void {
    if (username.length > 2) {
      this.showNext = true;
      this.username = username;
      this.setDivHeight('35vh');
    } else {
      this.showNext = false;
      this.setDivHeight('28vh');
    }
  }

  getPassword(password: string): void {
    if (password.length > 1) {
      this.password = password;
      this.showNext = true;
      if (this.newUser) {
        this.setDivHeight('34vh');
      } else {
        this.setDivHeight('38vh');
      }
    } else {
      this.showNext = false;
      this.setDivHeight('32vh');
    }
  }

  next(): void {
    if (this.showPass) {
      this.validatePassword();
    } else {
      // validate username
      this.checkUsername(this.username);
    }
  }

  reset(): void {
    this.nextText = 'Next';
    this.setDivHeight('28vh');
    this.showPass = false;
    this.showNext = false;
  }

  addNewUser(): void {
    const body = {
      username: this.username,
      password: this.password,
    };

    this.httpService
      .sendPostRequest('/users', JSON.stringify(body))
      .subscribe((res: any) => {
        this.authService.setCookies(this.username, this.password);
        this.router.navigate(['/', 'notes']);
      });
  }

  validatePassword(): void {
    this.loggingIn = true;
    this.password = this.authService.hashIt(this.password);
    const body = {
      user: this.username,
      pass: this.password,
    };

    if (this.newUser) {
      this.addNewUser();
    } else {
      this.httpService
        .sendPostRequest('/user/' + this.username, JSON.stringify(body))
        .subscribe((res: { status: boolean }) => {
          if (res.status) {
            this.authService.setCookies(this.username, this.password);
            this.router.navigate(['/', 'notes']);
            location.reload();
          } else {
            const options = {
              title: 'Invalid Credentials',
              message:
                'The password for given username is incorrect. Please try again.',
              cancelText: 'Cancel',
              confirmText: 'Ok',
              accent: 'accent',
            };
            this.dialogService.open(options);
          }
        });
    }
  }

  checkUsername(username: string): void {
    this.httpService
      .sendGetRequest('/user/' + username)
      .subscribe((res: { status: boolean }) => {
        if (res.status) {
          this.sameOldUser();
        } else {
          this.greetNewUser();
        }
      });
  }

  sameOldUser(): void {
    this.showPass = true;
    this.showNext = false;
    this.nextText = 'Login';
    this.setDivHeight('32vh');
  }

  greetNewUser(): void {
    this.newUser = true;
    const options = {
      title: 'Message',
      message: 'You are new to Quick notes. Create an account?',
      cancelText: 'Cancel',
      confirmText: 'Proceed',
      accent: 'accent',
    };
    this.dialogService.open(options);
    this.dialogService.confirmed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.showPass = true;
        this.showNext = false;
        this.nextText = 'Login';
        this.setDivHeight('28vh');
      }
    });
  }
}
