import * as ActionTypes from '../actions/ActionTypes';
const initialState = {
  showNavigation: true,
};

export const CommonsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SHOW_NAVIGATION:
      return {
        ...state,
        showNavigation: action.show,
      };
    default:
      return state;
  }
};
