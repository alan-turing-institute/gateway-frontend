import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, empty, Observable, of } from 'rxjs';
import {
  catchError,
  concatMap,
  debounceTime,
  tap,
  map,
  mergeMap,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs/operators';

import { MiddlewareService } from '@core/services/middleware.service';
import { NormaliserService } from '@core/services/normaliser.service';

import {
  CaseActionTypes,
  GetOneCase,
  GetOneCaseSuccess,
  GetOneCaseError,
} from './case.actions';

import { FieldActionTypes, AddField } from './field.actions';

import { Case } from '../models/case';
import { Scheduler } from 'rxjs/internal/Scheduler';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler',
);

// Field[] schema definition
// specSchema = new schema.Entity('specs');
// specListSchema = new schema.Array(specSchema);
// fieldSchema = new schema.Entity('fields');
// fieldListSchema = new schema.Array(fieldSchema);
// fieldSchema.define({ fields: fieldListSchema, specs: specListSchema }); // allow recursion

@Injectable()
export class CaseEffects {
  // normalize$: Observable;

  @Effect()
  loadOne$: Observable<Action> = this.actions$.pipe(
    ofType<GetOneCase>(CaseActionTypes.GetOneCase),
    map(action => action.payload),
    mergeMap(caseId =>
      this.middleware.getCase(caseId).pipe(
        catchError(err => of(new GetOneCaseError(err))),
        map(returnObject => new AddField(returnObject)),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private middleware: MiddlewareService,
    private normaliser: NormaliserService,
  ) {}
}
