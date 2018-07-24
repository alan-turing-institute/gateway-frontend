import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromCases from './case.reducer';
import * as fromRoot from '../../../reducers';

export interface CasesState {
  search: fromSearch.State;
  cases: fromCases.State;
}

export interface State extends fromRoot.State {
  cases: CasesState;
}

export const reducers: ActionReducerMap<CasesState> = {
  search: fromSearch.reducer,
  cases: fromCases.reducer,
};

/**
 * A selector function is a map function factory. We pass it parameters and it
 * returns a function that maps from the larger state tree into a smaller
 * piece of state. This selector simply selects the `cases` state.
 *
 * Selectors are used with the `select` operator.
 *
 * ```ts
 * class MyComponent {
 *   constructor(state$: Observable<State>) {
 *     this.casesState$ = state$.pipe(select(getCasesState));
 *   }
 * }
 * ```
 */

/**
 * The createFeatureSelector function selects a piece of state from the root of the state object.
 * This is used for selecting feature states that are loaded eagerly or lazily.
 */
export const getCasesState = createFeatureSelector<CasesState>('cases');

/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them usable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getCaseEntitiesState = createSelector(
  getCasesState,
  state => state.cases
);

export const getSelectedCaseId = createSelector(
  getCaseEntitiesState,
  fromCases.getSelectedId
);

/**
 * Adapters created with @ngrx/entity generate
 * commonly used selector functions including
 * getting all ids in the record set, a dictionary
 * of the records by id, an array of records and
 * the total number of records. This reduces boilerplate
 * in selecting records from the entity state.
 */
export const {
  selectIds: getCaseIds,
  selectEntities: getCaseEntities,
  selectAll: getAllCases,
  selectTotal: getTotalCases,
} = fromCases.adapter.getSelectors(getCaseEntitiesState);

export const getSelectedCase = createSelector(
  getCaseEntities,
  getSelectedCaseId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getSearchState = createSelector(
  getCasesState,
  (state: CasesState) => state.search
);

export const getSearchCaseIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of cases in the store.
 */
export const getSearchResults = createSelector(
  getCaseEntities,
  getSearchCaseIds,
  (cases, searchIds) => {
    return searchIds.map(id => cases[id]);
  }
);
