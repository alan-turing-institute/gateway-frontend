import { Action } from '@ngrx/store';
import { Case } from '../models/case';

export enum CaseActionTypes {
  GetCase = '[Case] Get Case',
  GetCaseSuccess = '[Case] Get Case Success',
  GetCaseError = '[Case] Get Case Error',
  SelectCase = '[Case] Select Case',
  UpdateCase = '[Case] Update Case',
}

export class GetCase implements Action {
  readonly type = CaseActionTypes.GetCase;

  constructor(public payload: string) {}
}

export class GetCaseSuccess implements Action {
  readonly type = CaseActionTypes.GetCaseSuccess;

  constructor(public payload: Case) {} // TODO type
}

export class GetCaseError implements Action {
  readonly type = CaseActionTypes.GetCaseError;

  constructor(public payload: string) {}
}

export class SelectCase implements Action {
  readonly type = CaseActionTypes.SelectCase;

  constructor(public payload: string) {}
}

export class UpdateCase implements Action {
  readonly type = CaseActionTypes.UpdateCase;

  constructor(public payload: Partial<Case>) {}
}

export type CaseActionsUnion =
  | GetCase
  | GetCaseSuccess
  | GetCaseError
  | SelectCase
  | UpdateCase;
