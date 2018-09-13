import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { User } from '@core/models/user';
import { environment } from '@env/environment';

@Injectable()
export class AuthService {
  private AUTH_LOGIN_PATH = `${environment.AUTH_URL}/auth/login`;
  private AUTH_LOGOUT_PATH = `${environment.AUTH_URL}/auth/logout`;

  constructor(private http: HttpClient) {}

  public login(user: User): Observable<object> {
    let body = JSON.stringify(user);

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(this.AUTH_LOGIN_PATH, body, httpOptions);
  }

  public logout(): Observable<object> {
    return this.http.post(this.AUTH_LOGOUT_PATH, null);
  }
}
