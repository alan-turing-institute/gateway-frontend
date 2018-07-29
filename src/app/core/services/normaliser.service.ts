import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Case } from '@simulations/models/case';
import { environment } from '@env/environment';

@Injectable()
export class NormaliserService {
  constructor() {}

  normaliseCase(): Observable<object> {
    return of({ foo: 'bar' });
  }
}
