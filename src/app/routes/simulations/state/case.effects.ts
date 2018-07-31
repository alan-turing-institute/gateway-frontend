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
import { NormalizerService } from '@core/services/normalizer.service';

import {
  CaseActionTypes,
  GetCase,
  GetCaseSuccess,
  GetCaseError,
} from './case.actions';

import { UpsertManySpecs } from './spec.actions';

import { FieldActionTypes, UpsertManyFields } from './field.actions';

import { Case, NormalizedCase } from '../models/case';
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
    ofType<GetCase>(CaseActionTypes.GetCase),
    map(action => action.payload),
    mergeMap(caseId =>
      this.middleware.getCase(caseId).pipe(
        catchError(err => of(new GetCaseError(err))),
        mergeMap((apiCase: ApiCase) =>
          this.normalizer
            .normalizeCase(apiCase)
            .pipe(
              concatMap((normalizedCase: NormalizedCase) => [
                new GetCaseSuccess(normalizedCase.case),
                new UpsertManySpecs(normalizedCase.specs),
                new UpsertManyFields(normalizedCase.fields),
              ]),
            ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private middleware: MiddlewareService,
    private normalizer: NormalizerService,
  ) {}
}
