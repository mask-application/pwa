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

export const showNewVersionDialog = () => {
  return {
    type: ActionTypes.NEW_VERSION_AVAILABLE,
    payload: true,
  };
};

export const hideNewVersionDialog = () => {
  return {
    type: ActionTypes.NEW_VERSION_AVAILABLE,
    payload: false,
  };
};
