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

import { UpsertManySpecs } from './spec.actions';

import { FieldActionTypes, UpsertManyFields } from './field.actions';

import { Case, FlattenedCase } from '../models/case';
import { ApiCase } from '../models/case';
import { Scheduler } from 'rxjs/internal/Scheduler';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler',
);

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
        mergeMap((apiCase: ApiCase) =>
          this.normaliser
            .flattenCase(apiCase)
            .pipe(
              concatMap((flatCase: FlattenedCase) => [
                new GetOneCaseSuccess(flatCase.case),
                new UpsertManySpecs(flatCase.specs),
                new UpsertManyFields(flatCase.fields),
              ]),
            ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private middleware: MiddlewareService,
    private normaliser: NormaliserService,
  ) {}
}
