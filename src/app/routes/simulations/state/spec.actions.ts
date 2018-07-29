import { Action } from '@ngrx/store';
import { Case } from '../models/case';
import { Spec } from '../models/spec';

export enum SpecActionTypes {
  SelectSpec = '[Spec] Select Spec',
  UpsertManySpecs = '[Spec] Upsert Many Specs',
}

export class SelectSpec implements Action {
  readonly type = SpecActionTypes.SelectSpec;

  constructor(public payload: string) {}
}

export class UpsertManySpecs implements Action {
  readonly type = SpecActionTypes.UpsertManySpecs;

  constructor(public payload: Spec[]) {}
}

export type SpecActionsUnion = SelectSpec | UpsertManySpecs;
