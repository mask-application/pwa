import {
  FETCH_MAP_REQUEST,
  FETCH_MAP_SUCCESS,
  FETCH_MAP_ERROR,
} from './MapActions';

const initialState = {
  isMapFetching: false,
  mapList: [],
  serverError: false,
};

export const MapReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MAP_REQUEST:
      return {
        ...state,
        isMapFetching: true,
      };
    case FETCH_MAP_SUCCESS:
      return {
        ...state,
        isMapFetching: false,
        mapList: action.payload,
      };
    case FETCH_MAP_ERROR:
      return {
        ...state,
        isMapFetching: false,
        serverError: true,
      };
    default:
      return state;
  }
};
