import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  showNavigation: true,
  showNewVersionDialog: false,
};

export const CommonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_NAVIGATION:
      return {
        ...state,
        showNavigation: action.show,
      };
    case ActionTypes.NEW_VERSION_AVAILABLE:
      return {
        ...state,
        showNewVersionDialog: action.payload,
      };
    default:
      return state;
  }
};
