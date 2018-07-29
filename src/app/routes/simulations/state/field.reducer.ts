import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Field } from '../models/field';
import { FieldActionsUnion, FieldActionTypes } from './field.actions';

export interface State extends EntityState<Field> {
  selectedFieldId: string | null;
}

export const adapter: EntityAdapter<Field> = createEntityAdapter<Field>({
  selectId: (field: Field) => field.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedFieldId: null,
});

export function reducer(
  state = initialState,
  action: FieldActionsUnion,
): State {
  switch (action.type) {
    case FieldActionTypes.SelectField: {
      return {
        ...state,
        selectedFieldId: action.payload,
      };
    }

    case FieldActionTypes.AddField: {
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedFieldId;
