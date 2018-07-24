import { Action } from '@ngrx/store';
import { Case } from '../models/case';

export enum CaseActionTypes {
  Search = '[Case] Search',
  SearchComplete = '[Case] Search Complete',
  SearchError = '[Case] Search Error',
  Load = '[Case] Load',
  LoadSuccess = '[Case] Load Complete',
  LoadError = '[Case] Load Error',
  Select = '[Case] Select',
  UpdateOne = '[Case] Update One',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */


export class Load implements Action {
  readonly type = CaseActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = CaseActionTypes.LoadSuccess;

  constructor(public payload: Case[]) {}
}

export class LoadError implements Action {
  readonly type = CaseActionTypes.LoadError;

  constructor(public payload: string) {}
}

export class Search implements Action {
  readonly type = CaseActionTypes.Search;

  constructor(public payload: string) {}
}

export class SearchComplete implements Action {
  readonly type = CaseActionTypes.SearchComplete;

  constructor(public payload: Case[]) {}
}

export class SearchError implements Action {
  readonly type = CaseActionTypes.SearchError;

  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = CaseActionTypes.Select;

  constructor(public payload: string) {}
}

export class UpdateOne implements Action {
  readonly type = CaseActionTypes.UpdateOne;

  constructor(
    public id: string,
    public changes: Partial<Case>,
  ) {}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CaseActionsUnion =
  | Search
  | SearchComplete
  | SearchError
  | Load
  | LoadSuccess
  | LoadError
  | Select
  | UpdateOne;
