import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';

import { Spec } from '../models/spec';
import { SpecActionsUnion, SpecActionTypes } from './spec.actions';

export interface State extends EntityState<Spec> {
  selectedSpecId: string | null;
}

export const adapter: EntityAdapter<Spec> = createEntityAdapter<Spec>({
  selectId: (spec: Spec) => spec.id,
  sortComparer: false,
});

export const initialState: State = adapter.getInitialState({
  selectedSpecId: null,
});

export function reducer(state = initialState, action: SpecActionsUnion): State {
  switch (action.type) {
    // case SpecActionTypes.SelectSpec: {
    //   return {
    //     ...state,
    //     selectedSpecId: action.payload,
    //   };
    // }

    case SpecActionTypes.UpsertManySpecs: {
      console.log('DEBUG(spec.reducer.ts):', action.payload);
      return adapter.upsertMany(action.payload, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedSpecId;
