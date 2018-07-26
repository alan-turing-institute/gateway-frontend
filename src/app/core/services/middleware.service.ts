import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CaseSummary } from '@simulations/models/case-summary';
import { Case } from '@simulations/models/case';
import { environment } from '@env/environment';

@Injectable()
export class MiddlewareService {
  private CASE_API_PATH = `${environment.MIDDLEWARE_URL}/case`;

  constructor(private http: HttpClient) {}

  getAllCaseSummaries(): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // TODO redundant
  }

  searchCaseSummaries(queryTitle: string): Observable<CaseSummary[]> {
    return this.http
      .get<CaseSummary[]>(this.CASE_API_PATH)
      .pipe(map(caseSummaries => caseSummaries || [])); // TODO redundant
  }

  getCase(id: string): Observable<Case> {
    return this.http
      .get<Case>(`${this.CASE_API_PATH}/${id}`)
      .pipe(map(caseObject => caseObject));
  }
}

// reference construct
// searchBooks(queryTitle: string): Observable<Book[]> {
//   return this.http
//     .get<{ items: Book[] }>(`${this.CASE_API_PATH}?q=${queryTitle}`)
//     .pipe(map(books => books.items || []));
// }
