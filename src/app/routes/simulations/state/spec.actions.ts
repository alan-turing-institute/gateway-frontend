import { Action } from '@ngrx/store';
import { Spec } from '../models/spec';

export enum SpecActionTypes {
  SelectSpec = '[Spec] Select Spec',
  UpdateOneSpec = '[Spec] Update One Spec',
}

export class SelectSpec implements Action {
  readonly type = SpecActionTypes.SelectSpec;

  constructor(public payload: string) {}
}

export class UpdateOneSpec implements Action {
  readonly type = SpecActionTypes.UpdateOneSpec;

  constructor(public payload: Partial<Spec>) {}
}

export type SpecActionsUnion = SelectSpec | UpdateOneSpec;
