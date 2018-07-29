import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { normalize, denormalize, schema } from 'normalizr';

import { Case } from '../models/case';
import { Spec } from '../models/spec';
import { CaseActionsUnion, CaseActionTypes } from './case.actions';

export interface State extends EntityState<Case> {
  selectedCaseId: string | null;
}

export const adapter: EntityAdapter<Case> = createEntityAdapter<Case>({
  selectId: (caseObject: Case) => caseObject.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedCaseId: null,
});

// schema for fields list
const specSchema = new schema.Entity('specs');
const specListSchema = new schema.Array(specSchema);
const fieldSchema = new schema.Entity('fields');
const fieldListSchema = new schema.Array(fieldSchema);
fieldSchema.define({ fields: fieldListSchema, specs: specListSchema }); // allow recursion

export function reducer(state = initialState, action: CaseActionsUnion): State {
  switch (action.type) {
    case CaseActionTypes.GetOneCase: {
      return state;
    }
    case CaseActionTypes.GetOneCaseError: {
      return state;
    }
    case CaseActionTypes.GetOneCaseSuccess: {
      // this logic should be in an effect as it changes both Case and Spec state
      const normalizedCase = normalize(action.payload.fields, fieldListSchema);

      return adapter.addOne(action.payload, state); // TODO store normalizedCase.result (refactor Type)
    }

    case CaseActionTypes.SelectCase: {
      return {
        ...state,
        selectedCaseId: action.payload,
      };
    }

    case CaseActionTypes.UpdateManySpec: {
      console.log('DEBUG(case.reducer.ts)', action.payload);
      return state;
    }

    // case CaseActionTypes.UpdateOne: {
    //   return adapter.updateOne(
    //     {
    //       id: state.selectedCaseId,
    //       changes: action.payload,
    //     },
    //     state,
    //   );
    // }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedCaseId;
