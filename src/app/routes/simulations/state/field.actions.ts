import { Action } from '@ngrx/store';
import { Field } from '../models/field';

export enum FieldActionTypes {
  SelectField = '[Field] Select Field',
  UpsertManyFields = '[Field] Upsert Many Fields',
}

export class SelectField implements Action {
  readonly type = FieldActionTypes.SelectField;

  constructor(public payload: string) {}
}

export class UpsertManyFields implements Action {
  readonly type = FieldActionTypes.UpsertManyFields;

  constructor(public payload: Field[]) {}
}

export type FieldActionsUnion = SelectField | UpsertManyFields;
