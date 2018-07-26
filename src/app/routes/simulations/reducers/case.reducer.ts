import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Case } from '../models/case';
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
    case CaseActionTypes.LoadOneSuccess: {
      console.log('DEBUG(case.reducer.ts) LoadOneSuccess');
      // return adapter.addOne(action.payload, {
      //   ...state,
      //   selectedCaseId: state.selectedCaseId,
      // });
    }

    // case CaseActionTypes.Select: {
    //   return {
    //     ...state,
    //     selectedCaseId: action.payload,
    //   };
    // }

    // case CaseActionTypes.UpdateOne: {
    //   return adapter.updateOne(
    //     {
    //       id: state.selectedCaseId,
    //       changes: action.changes,
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
