import { Action } from '@ngrx/store';
import { Case } from '../models/case';
import { Spec } from '../models/spec';

export enum CaseActionTypes {
  GetOneCase = '[Case] Get One Case',
  GetOneCaseSuccess = '[Case] Get One Case Success',
  GetOneCaseError = '[Case] Get One Case Error',
  SelectCase = '[Case] Select Case',
  UpdateOneCase = '[Case] Update One Case',
  UpdateManySpec = '[Case] Update Many Spec',
}

export class GetOneCase implements Action {
  readonly type = CaseActionTypes.GetOneCase;

  constructor(public payload: string) {}
}

export class GetOneCaseSuccess implements Action {
  readonly type = CaseActionTypes.GetOneCaseSuccess;

  constructor(public payload: Case) {}
}

export class GetOneCaseError implements Action {
  readonly type = CaseActionTypes.GetOneCaseError;

  constructor(public payload: string) {}
}

export class SelectCase implements Action {
  readonly type = CaseActionTypes.SelectCase;

  constructor(public payload: string) {}
}

export class UpdateOneCase implements Action {
  readonly type = CaseActionTypes.UpdateOneCase;

  constructor(public payload: Partial<Case>) {}
}

export class UpdateManySpec implements Action {
  readonly type = CaseActionTypes.UpdateManySpec;
  // constructor(public payload: Spec[]) {}
  constructor(public payload: string) {}
}

export type CaseActionsUnion =
  | GetOneCase
  | GetOneCaseSuccess
  | GetOneCaseError
  | SelectCase
  | UpdateOneCase
  | UpdateManySpec;
