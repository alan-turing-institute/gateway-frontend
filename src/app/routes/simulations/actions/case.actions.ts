import { Action } from '@ngrx/store';
import { Case } from '../models/case';

export enum CaseActionTypes {
  Search = '[Case] Search',
  SearchComplete = '[Case] Search Complete',
  SearchError = '[Case] Search Error',
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
 export class Search implements Action {
   readonly type = BookActionTypes.Search;

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

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type CaseActionsUnion =
  | Search
  | SearchComplete
  | SearchError;
