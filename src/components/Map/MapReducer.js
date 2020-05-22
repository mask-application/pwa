import {
  FETCH_MAP_REQUEST,
  FETCH_MAP_SUCCESS,
  FETCH_MAP_ERROR,
  FETCH_PRIVATE_MAP_REQUEST,
  FETCH_PRIVATE_MAP_SUCCESS,
  FETCH_PRIVATE_MAP_ERROR,
} from './MapActions';

const initialState = {
  isMapFetching: false,
  isPrivateMapFetching: false,
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
        mapList: [...state.mapList, ...action.payload].sort(
          (a, b) => a.priority || 'zzzzzzz' > b.priority || 'zzzzzzz'
        ),
      };
    case FETCH_MAP_ERROR:
      return {
        ...state,
        isMapFetching: false,
        serverError: true,
      };
    case FETCH_PRIVATE_MAP_REQUEST:
      return {
        ...state,
        isPrivateMapFetching: true,
      };
    case FETCH_PRIVATE_MAP_SUCCESS:
      return {
        ...state,
        isPrivateMapFetching: false,
        mapList: [...state.mapList, ...action.payload].sort(
          (a, b) => a.priority || 'zzzzzzz' > b.priority || 'zzzzzzz'
        ),
      };
    case FETCH_PRIVATE_MAP_ERROR:
      return {
        ...state,
        isPrivateMapFetching: false,
        serverError: true,
      };
    default:
      return state;
  }
};
