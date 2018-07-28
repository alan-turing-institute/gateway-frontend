import { Action } from '@ngrx/store';
import { Case } from '../models/case';

export enum CaseActionTypes {
  LoadOne = '[Case] Load One',
  LoadOneSuccess = '[Case] Load One Success',
  LoadOneError = '[Case] Load One Error',
  Select = '[Case] Select',
  UpdateOne = '[Case] Update One',
}

export class LoadOne implements Action {
  readonly type = CaseActionTypes.LoadOne;

  constructor(public payload: string) {}
}

export class LoadOneSuccess implements Action {
  readonly type = CaseActionTypes.LoadOneSuccess;

  constructor(public payload: Case) {}
}

export class LoadOneError implements Action {
  readonly type = CaseActionTypes.LoadOneError;

  constructor(public payload: string) {}
}

export class Select implements Action {
  readonly type = CaseActionTypes.Select;

  constructor(public payload: string) {}
}

export class UpdateOne implements Action {
  readonly type = CaseActionTypes.UpdateOne;

  constructor(public payload: Partial<Case>) {}
}

export type CaseActionsUnion =
  | LoadOne
  | LoadOneSuccess
  | LoadOneError
  | Select
  | UpdateOne;
