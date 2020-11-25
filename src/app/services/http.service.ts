import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { EnvService } from '../env.service';
import { HttpClient } from '@angular/common/http';

const header = { 'content-type': 'application/json' };

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  baseURL: string;

  constructor(private http: HttpClient, private env: EnvService) {
    this.baseURL = env.apiUrl;
  }

  sendGetRequest(url: string): Observable<{}> {
    return this.http.get(this.baseURL + url, { headers: header });
  }

  sendPostRequest(url: string, body: string): Observable<{}> {
    return this.http.post(this.baseURL + url, body, { headers: header });
  }

  sendPatchRequest(url: string, body: string): Observable<{}> {
    return this.http.patch(this.baseURL + url, body, { headers: header });
  }

  sendDeleteRequest(url: string): Observable<{}> {
    return this.http.delete(this.baseURL + url, { headers: header });
  }
}
