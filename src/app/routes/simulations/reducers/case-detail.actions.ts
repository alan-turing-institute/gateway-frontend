import { Action } from '@ngrx/store';
import { CaseDetail } from '../models/case-detail';

export enum CaseDetailActionTypes {
  Search = '[CaseDetail] Search',
  SearchComplete = '[CaseDetail] Search Complete',
  SearchError = '[CaseDetail] Search Error',
  Load = '[CaseDetail] Load',
  LoadSuccess = '[CaseDetail] Load Complete',
  LoadError = '[CaseDetail] Load Error',
  Select = '[CaseDetail] Select',
  UpdateOne = '[CaseDetail] Update One',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */

export class Load implements Action {
  readonly type = CaseDetailActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CaseDetailActionTypes.LoadSuccess;

  constructor(public payload: CaseDetail[]) {}
}

export class LoadError implements Action {
  readonly type = CaseDetailActionTypes.LoadError;

  constructor(public payload: string) {}
}

export class Search implements Action {
  readonly type = CaseDetailActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = CaseDetailActionTypes.SearchComplete;

  constructor(public payload: CaseDetail[]) {}
}

export class SearchError implements Action {
  readonly type = CaseDetailActionTypes.SearchError;

  constructor(public payload: string) {}
}
1;
export class Select implements Action {
  readonly type = CaseDetailActionTypes.Select;

  constructor(public payload: string) {}
}

export class UpdateOne implements Action {
  readonly type = CaseDetailActionTypes.UpdateOne;

  constructor(public changes: Partial<CaseDetail>) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CaseDetailActionsUnion =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | LoadSuccess
  | LoadError
  | Select
  | UpdateOne;
