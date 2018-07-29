import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

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

export function reducer(state = initialState, action: CaseActionsUnion): State {
  switch (action.type) {
    case CaseActionTypes.GetOneCase: {
      return state;
    }
    case CaseActionTypes.GetOneCaseError: {
      return state;
    }
    case CaseActionTypes.GetOneCaseSuccess: {
      return adapter.addOne(action.payload, state);
    }

    // case CaseActionTypes.SelectCase: {
    //   return {
    //     ...state,
    //     selectedCaseId: action.payload,
    //   };
    // }

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
