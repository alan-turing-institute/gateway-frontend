import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Case } from '@simulations/models/case';
import { environment } from '@env/environment';

@Injectable()
export class MiddlewareService {

  private CASE_API_PATH = `${environment.MIDDLEWARE_URL}/case`;
  private JOB_API_PATH = `${environment.MIDDLEWARE_URL}/job`;

  constructor(private http: HttpClient) {}


  searchCases(queryTitle: string): Observable<Case[]> {
    return this.http
      .get<Book[]>(this.CASE_API_PATH)
      .pipe(map(books => books || []));
  }

}



// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
//
// import { Case } from '@simulations/models/case';
//
// @Injectable()
// export class GoogleBooksService {
//   private API_PATH = 'https://www.googleapis.com/books/v1/volumes';
//
//   constructor(private http: HttpClient) {}
//
//   searchBooks(queryTitle: string): Observable<Book[]> {
//     return this.http
//       .get<{ items: Book[] }>(`${this.API_PATH}?q=${queryTitle}`)
//       .pipe(map(books => books.items || []));
//   }
//
//   retrieveBook(volumeId: string): Observable<Book> {
//     return this.http.get<Book>(`${this.API_PATH}/${volumeId}`);
//   }
// }
