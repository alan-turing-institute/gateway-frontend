import {
  LayoutActionTypes,
  LayoutActionsUnion,
} from '../actions/layout.actions';

export interface State {
  showSidebar: boolean;
}

const initialState: State = {
  showSidebar: true,
};

export function reducer(
  state: State = initialState,
  action: LayoutActionsUnion
): State {
  switch (action.type) {
    case LayoutActionTypes.CloseSidebar:
      return {
        showSidebar: false,
      };

    case LayoutActionTypes.OpenSidebar:
      return {
        showSidebar: true,
      };

    default:
      return state;
  }
}

export const getShowSidebar = (state: State) => state.showSidebar;
