import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { User } from './user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  // private USER_BASE_URL: string = 'http://localhost:5000/auth';
  private USER_BASE_URL: string = 'https://science-gateway-users.azurewebsites.net/auth';
  // private COUNTER_BASE_URL: string = 'http://localhost:5000/api';
  private COUNTER_BASE_URL: string = 'https://science-gateway-count.azurewebsites.net/api';

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  constructor(private http: HttpClient) {}

  login(user: User): Promise<any> {
    console.log("Hit AuthService login")
    let url: string = `${this.USER_BASE_URL}/login`;

    console.log("posting with");
    console.log('url', url);
    console.log('user', user);
    console.log('this.headers', this.headers);

    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  register(user: User): Promise<any> {
    let url: string = `${this.USER_BASE_URL}/register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  ensureAuthenticated(token): Promise<any> {
    console.log(token)
    let url: string = `${this.USER_BASE_URL}/status`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.get(url, {headers: headers}).toPromise();
  }

  countSimulation(token): Promise<any> {
    let url: string = `${this.COUNTER_BASE_URL}/count`;
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.post(url, {}, {headers: headers}).toPromise();
  }

  logout(token): Promise<any> {
    let url: string = `${this.USER_BASE_URL}/logout`;
    let headers = new HttpHeaders({
      'Content-Type': 'apfplication/json',
      Authorization: `Bearer ${token}`
    });
    return this.http.post(url, {}, {headers: headers}).toPromise();
  }

}
