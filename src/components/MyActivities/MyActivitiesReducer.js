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
  successHealthEvent: false,
  healthEventLoading: false,
  errorHealthEvent: false,
  createTime: localStorage.getItem('create_time'),
  firstCreateTime: localStorage.getItem('first_create_time'),
  qrEvent: {
    loading: false,
    success: false,
    error: false,
  },
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
      if (state.firstCreateTime === null) {
        return {
          ...state,
          eventResult: action.eventResult,
          eventCounter: action.eventCounter,
          successHealthEvent: true,
          healthEventLoading: false,
          errorHealthEvent: false,
          createTime: action.createTime,
          firstCreateTime: action.createTime,
        };
      } else {
        return {
          ...state,
          eventResult: action.eventResult,
          eventCounter: action.eventCounter,
          successHealthEvent: true,
          healthEventLoading: false,
          errorHealthEvent: false,
          createTime: action.createTime,
        };
      }
    case ActionTypes.SHOW_HEALTH_EVENT_LOADING:
      return {
        ...state,
        healthEventLoading: true,
        errorHealthEvent: false,
      };
    case ActionTypes.ERROR_IN_HEALTH_EVENT_API:
      return {
        ...state,
        errorHealthEvent: true,
        healthEventLoading: false,
      };
    case ActionTypes.ADD_MEETING_EVENT_REQUEST:
      return {
        ...state,
        qrEvent: {
          ...state.qrEvent,
          loading: true,
        },
      };
    case ActionTypes.ADD_MEETING_EVENT_SUCCESS:
      return {
        ...state,
        eventResult: action.eventResult,
        eventCounter: action.eventCounter,
        qrEvent: {
          ...state.qrEvent,
          success: true,
        },
      };
    case ActionTypes.ADD_MEETING_EVENT_FAILURE:
      return {
        ...state,
        qrEvent: {
          ...state.qrEvent,
          error: true,
        },
      };
    default:
      return state;
  }
}
