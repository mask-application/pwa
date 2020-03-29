import * as ActionTypes from '../actions/ActionTypes';

export const hideNavigation = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SHOW_NAVIGATION,
      show: false,
    });
  };
};

export const showNav = () => {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SHOW_NAVIGATION,
      show: true,
    });
  };
};
