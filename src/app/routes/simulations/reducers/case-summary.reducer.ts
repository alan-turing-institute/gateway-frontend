import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';


import { CaseSummary } from '../models/case-summary';
import { CaseSummaryActionsUnion, CaseSummaryActionTypes } from './case-summary.actions';

/**
 * @ngrx/entity provides a predefined interface for handling
 * a structured dictionary of records. This interface
 * includes an array of ids, and a dictionary of the provided
 * model type by id. This interface is extended to include
 * any additional interface properties.
 */
export interface State extends EntityState<CaseSummary> {
  selectedCaseSummaryId: string | null;
}

/**
 * createEntityAdapter creates an object of many helper
 * functions for single or multiple operations
 * against the dictionary of records. The configuration
 * object takes a record id selector function and
 * a sortComparer option which is set to a compare
 * function if the records are to be sorted.
 */
export const adapter: EntityAdapter<CaseSummary> = createEntityAdapter<CaseSummary>({
  selectId: (caseSummary: CaseSummary) => caseSummary.id,
  sortComparer: false,
})

/**
 * getInitialState returns the default initial state
 * for the generated entity state. Initial state
 * additional properties can also be defined.
 */
export const initialState: State = adapter.getInitialState({
  selectedCaseSummaryId: null,
});



// action is saying that the action type must be wihin the union
export function reducer(
  state = initialState,
  action: CaseSummaryActionsUnion
): State {


  switch (action.type) {

    case CaseSummaryActionTypes.SearchComplete:
    case CaseSummaryActionTypes.LoadSuccess: {
      /**
       * The addMany function provided by the created adapter
       * adds many records to the entity dictionary
       * and returns a new state including those records. If
       * the collection is to be sorted, the adapter will
       * sort each record upon entry into the sorted array.
       */
      // Here we actually add the cases to the Stata entity store
      // All reducers contain a state change
      return adapter.addMany(action.payload, {
        ...state,
        selectedCaseSummaryId: state.selectedCaseSummaryId,
      });
    }

    case CaseSummaryActionTypes.Select: {
      return {
        ...state,
        selectedCaseSummaryId: action.payload,
      }
    }

    case CaseSummaryActionTypes.UpdateOne: {
      console.log('DEBUG(case-summary.reducer.ts): action:', action);
      console.log('DEBUG(case-summary.reducer.ts): action.id:', action.id);
      console.log('DEBUG(case-summary.reducer.ts): action.changes:', action.changes);

      return adapter.updateOne({
        id: action.id,
        changes: action.changes
      }, state);

    }

    default: {
      return state;
    }

  }
}

/**
 * Because the data structure is defined within the reducer it is optimal to
 * locate our selector functions at this level. If store is to be thought of
 * as a database, and reducers the tables, selectors can be considered the
 * queries into said database. Remember to keep your selectors small and
 * focused so they can be combined and composed to fit each particular
 * use-case.
 */

export const getSelectedId = (state: State) => state.selectedCaseSummaryId;
