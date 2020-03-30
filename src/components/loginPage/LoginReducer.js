import * as ActionTypes from '../../redux/actions/ActionTypes';
const initialState = {
  test: true,
};

export const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        test: false,
      };
    default:
      return state;
  }
};
