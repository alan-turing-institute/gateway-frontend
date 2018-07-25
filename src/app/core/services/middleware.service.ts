import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CaseSummary } from '@simulations/models/case-summary';
import { environment } from '@env/environment';

@Injectable()
export class MiddlewareService {
  private CASE_API_PATH = `${environment.MIDDLEWARE_URL}/case`;
  private JOB_API_PATH = `${environment.MIDDLEWARE_URL}/job`;

  constructor(private http: HttpClient) {}

  getAllCaseSummaries(): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // redundant
  }

  searchCaseSummaries(queryTitle: string): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // redundant
  }
}

// reference construct
// searchBooks(queryTitle: string): Observable<Book[]> {
//   return this.http
//     .get<{ items: Book[] }>(`${this.API_PATH}?q=${queryTitle}`)
//     .pipe(map(books => books.items || []));
// }
