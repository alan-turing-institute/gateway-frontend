import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromSearch from './search.reducer';
import * as fromCaseSummaries from './case-summary.reducer';
import * as fromCases from './case.reducer';
import * as fromFields from './field.reducer';
import * as fromSpecs from './spec.reducer';
import * as fromRoot from '../../../state';

export interface CasesState {
  search: fromSearch.State;
  summaries: fromCaseSummaries.State;
  details: fromCases.State;
  specs: fromSpecs.State;
  fields: fromFields.State;
}

export interface State extends fromRoot.State {
  cases: CasesState;
}

export const reducers: ActionReducerMap<CasesState> = {
  search: fromSearch.reducer,
  summaries: fromCaseSummaries.reducer,
  details: fromCases.reducer,
  fields: fromFields.reducer,
  specs: fromSpecs.reducer,
};

export const getCasesState = createFeatureSelector<CasesState>('cases');

// Access entity stores
export const getCaseSummaryEntitiesState = createSelector(
  getCasesState,
  state => state.summaries,
);

export const getCaseEntitiesState = createSelector(
  getCasesState,
  state => state.details,
);

export const getFieldEntitiesState = createSelector(
  getCasesState,
  state => state.fields,
);

export const getSpecEntitiesState = createSelector(
  getCasesState,
  state => state.specs,
);

// Access selected ids
export const getSelectedCaseSummaryId = createSelector(
  getCaseSummaryEntitiesState,
  fromCaseSummaries.getSelectedId,
);

export const getSelectedCaseId = createSelector(
  getCaseEntitiesState,
  fromCases.getSelectedId,
);

export const getSelectedFieldId = createSelector(
  getFieldEntitiesState,
  fromFields.getSelectedId,
);

export const getSelectedSpecId = createSelector(
  getSpecEntitiesState,
  fromSpecs.getSelectedId,
);

// CRUD boilerplate selectors
export const {
  selectIds: getCaseSummaryIds,
  selectEntities: getCaseSummaryEntities,
  selectAll: getAllCaseSummaries,
  selectTotal: getTotalCaseSummaries,
} = fromCaseSummaries.adapter.getSelectors(getCaseSummaryEntitiesState);

export const {
  selectIds: getCaseIds,
  selectEntities: getCaseEntities,
  selectAll: getAllCases,
  selectTotal: getTotalCases,
} = fromCases.adapter.getSelectors(getCaseEntitiesState);

export const {
  selectIds: getFieldIds,
  selectEntities: getFieldEntities,
  selectAll: getAllFields,
  selectTotal: getTotalFields,
} = fromFields.adapter.getSelectors(getFieldEntitiesState);

export const {
  selectIds: getSpecIds,
  selectEntities: getSpecEntities,
  selectAll: getAllSpecs,
  selectTotal: getTotalSpecs,
} = fromSpecs.adapter.getSelectors(getSpecEntitiesState);

// object selection
export const getSelectedCaseSummary = createSelector(
  getCaseSummaryEntities,
  getSelectedCaseSummaryId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);

export const getSelectedCase = createSelector(
  getCaseSummaryEntities,
  getSelectedCaseId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);

export const getSelectedField = createSelector(
  getFieldEntities,
  getSelectedFieldId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);

export const getSelectedSpec = createSelector(
  getSpecEntities,
  getSelectedSpecId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  },
);

// Search content
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
