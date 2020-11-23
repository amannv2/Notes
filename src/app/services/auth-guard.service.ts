import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { ConfirmDialogService } from './confirmDialog.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthServiceService,
    private dialogService: ConfirmDialogService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      const options = {
        title: 'Message',
        message: 'Please login to start using Quick Notes',
        cancelText: 'Ok',
        confirmText: 'Cancel',
        accent: 'accent',
      };
      this.dialogService.open(options);
      this.router.navigate(['/', 'home']);
    }
  }
}
