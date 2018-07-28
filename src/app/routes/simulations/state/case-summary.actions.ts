import { Action } from '@ngrx/store';
import { CaseSummary } from '../models/case-summary';

export enum CaseSummaryActionTypes {
  Search = '[CaseSummary] Search',
  SearchComplete = '[CaseSummary] Search Complete',
  SearchError = '[CaseSummary] Search Error',
  Load = '[CaseSummary] Load',
  LoadSuccess = '[CaseSummary] Load Complete',
  LoadError = '[CaseSummary] Load Error',
  Select = '[CaseSummary] Select',
  UpdateOne = '[CaseSummary] Update One',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class Load implements Action {
  readonly type = CaseSummaryActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CaseSummaryActionTypes.LoadSuccess;

  constructor(public payload: CaseSummary[]) {}
}

export class LoadError implements Action {
  readonly type = CaseSummaryActionTypes.LoadError;

  constructor(public payload: string) {}
}

export class Search implements Action {
  readonly type = CaseSummaryActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = CaseSummaryActionTypes.SearchComplete;

  constructor(public payload: CaseSummary[]) {}
}

export class SearchError implements Action {
  readonly type = CaseSummaryActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = CaseSummaryActionTypes.Select;

  constructor(public payload: string) {}
}

export class UpdateOne implements Action {
  readonly type = CaseSummaryActionTypes.UpdateOne;

  constructor(public payload: Partial<CaseSummary>) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CaseSummaryActionsUnion =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | LoadSuccess
  | LoadError
  | Select
  | UpdateOne;
