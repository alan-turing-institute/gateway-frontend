import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromCaseSummaries from './case-summary.reducer';
import * as fromCaseDetails from './case-detail.reducer';
import * as fromRoot from '../../../reducers';

export interface CasesState {
  search: fromSearch.State;
  summaries: fromCaseSummaries.State;
  details: fromCaseDetails.State;
}

export interface State extends fromRoot.State {
  cases: CasesState;
}

export const reducers: ActionReducerMap<CasesState> = {
  search: fromSearch.reducer,
  summaries: fromCaseSummaries.reducer,
  details: fromCaseDetails.reducer,
};

// [wip] editing below

export const getCasesState = createFeatureSelector<CasesState>('cases');

export const getCaseSummaryEntitiesState = createSelector(
  getCasesState,
  state => state.summaries,
);

export const getSelectedCaseSummaryId = createSelector(
  getCaseSummaryEntitiesState,
  fromCaseSummaries.getSelectedId,
);

export const {
  selectIds: getCaseSummaryIds,
  selectEntities: getCaseSummaryEntities,
  selectAll: getAllCaseSummaries,
  selectTotal: getTotalCaseSummaries,
} = fromCaseSummaries.adapter.getSelectors(getCaseSummaryEntitiesState);

export const getSelectedCaseSummary = createSelector(
  getCaseSummaryEntities,
  getSelectedCaseSummaryId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);

export const getSearchState = createSelector(
  getCasesState,
  (state: CasesState) => state.search,
);

export const getSearchCaseSummaryIds = createSelector(
  getSearchState,
  fromSearch.getIds,
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery,
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading,
);
export const getSearchError = createSelector(
  getSearchState,
  fromSearch.getError,
);

export const getSearchResults = createSelector(
  getCaseSummaryEntities,
  getSearchCaseSummaryIds,
  (caseSummaries, searchIds) => {
    return searchIds.map(id => caseSummaries[id]);
  },
);
