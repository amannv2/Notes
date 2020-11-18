import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const baseURL = 'http://localhost:3000';
const header = { 'content-type': 'application/json' };

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  sendGetRequest(url: string): Observable<{}> {
    return this.http.get(baseURL + url, { headers: header });
  }

  sendPostRequest(url: string, body: string): Observable<{}> {
    return this.http.post(baseURL + url, body, { headers: header });
  }

  sendPatchRequest(url: string, body: string): Observable<{}> {
    return this.http.patch(baseURL + url, body, { headers: header });
  }

  sendDeleteRequest(url: string): Observable<{}> {
    return this.http.delete(baseURL + url, { headers: header });
  }
}
