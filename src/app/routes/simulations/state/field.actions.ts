import { Action } from '@ngrx/store';
import { Field } from '../models/field';

export enum FieldActionTypes {
  SelectField = '[Field] Select Field',
  AddField = '[Field] Add Field',
}

export class SelectField implements Action {
  readonly type = FieldActionTypes.SelectField;

  constructor(public payload: string) {}
}

export class AddField implements Action {
  readonly type = FieldActionTypes.AddField;

  constructor(public payload: string) {}
}

export type FieldActionsUnion = SelectField | AddField;
