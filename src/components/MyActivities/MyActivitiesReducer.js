import * as ActionTypes from '../../redux/actions/ActionTypes';

// The authentication token. Should be sent via "Access-Token" header.
const token = localStorage.getItem('token');

// User data stored in storage.
let user;
try {
  user = JSON.parse(localStorage.getItem('user'));
} catch (e) {
  // User data in storage might be broken
  user = null;
}

const initialState = {
  token,
  user,
  page: token ? 'INDEX' : 'NOT_SIGNED_UP',
  phone: null,
  condition: null,
  ttl: null,

  eventResult: JSON.parse(localStorage.getItem('eventResult')),
  eventCounter: localStorage.getItem('eventCounter') || 0,
  showNavBar: true,
};

export function MyActivitiesReducer(state = initialState, action) {
  switch (action.type) {
    case 'SHOW_SIGN_UP_PAGE':
      return {
        ...state,
        page: 'SIGN_UP',
      };
    case 'SHOW_NOT_SIGNED_UP_PAGE':
      return {
        ...state,
        page: 'NOT_SIGNED_UP',
      };
    case 'SHOW_ACTIVATION_PAGE':
      return {
        ...state,
        page: 'ACTIVATION',
        phone: action.phone,
        condition: action.condition,
        ttl: action.ttl,
      };
    case 'ACTIVATE_USER':
      localStorage.setItem('token', action.token);
      localStorage.setItem('user', JSON.stringify(action.user));
      return {
        ...state,
        page: 'INDEX',
        token: action.token,
        user: action.user,
      };
    case ActionTypes.SAVE_SUCCESS_EVENT_RESPONSE_TO_STATE:
      return {
        ...state,
        eventResult: action.eventResult,
        eventCounter: action.eventCounter,
      };
    default:
      return state;
  }
}
