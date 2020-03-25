import {
  FETCH_REQUEST,
  FETCH_SUCCESS
} from './ProvinceStatisticsActions';

const initialState = {
  data: [],
  stat: null
};

export const ProvinceStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        stat:"FETCH_REQUEST"
      };

    case FETCH_SUCCESS:
      return {
        ...state,
        data: action.payload,
        stat:"FETCH_SUCCESS"
      };

    default:
      return state;
  }
}
