import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class PushNotificationsService {
  public permission: Permission;

  constructor() {
    this.permission = this.isSupported() ? 'default' : 'denied';
  }

  public isSupported(): boolean {
    return 'Notification' in window;
  }

  requestPermission(): void {
    const self = this;

    if ('Notification' in window) {
      Notification.requestPermission((status) => {
        return (self.permission = status);
      });
    }
  }

  create(title: string, options?: PushNotification): any {
    const self = this;

    return new Observable((obs) => {
      if (!('Notification' in window)) {
        console.log('Notifications are not available in this environment');

        obs.complete();
      }

      if (self.permission !== 'granted') {
        console.log(
          'The user has not granted you permission to send push Notifications'
        );

        obs.complete();
      }

      const notify = new Notification(title, options);

      notify.onshow = (e) => {
        return obs.next({
          notification: notify,

          event: e,
        });
      };

      notify.onclick = (e) => {
        return obs.next({
          notification: notify,

          event: e,
        });
      };

      notify.onerror = (e) => {
        return obs.error({
          notification: notify,

          event: e,
        });
      };

      notify.onclose = () => {
        return obs.complete();
      };
    });
  }

  generateNotification(source: Array<any>): void {
    const self = this;

    source.forEach((item) => {
      const options = {
        body: item.alertContent,

        // icon: '../resource/images/bell-icon.png',
      };

      const notify = self.create(item.title, options).subscribe();
    });
  }
}

export declare type Permission = 'denied' | 'granted' | 'default';

export interface PushNotification {
  body?: string;
  icon?: string;
  tag?: string;
  data?: any;
  renotify?: boolean;
  silent?: boolean;
  sound?: string;
  noscreen?: boolean;
  sticky?: boolean;
  dir?: 'auto' | 'ltr' | 'rtl';
  lang?: string;
  vibrate?: number[];
}
