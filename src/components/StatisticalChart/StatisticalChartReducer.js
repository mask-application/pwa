import { FETCH_REQUEST, FETCH_SUCCESS } from './StatisticalChartActions';

const initialState = {
  isLoaded: false,
  data: {},
};

export const StatisticalChartReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return state;

    case FETCH_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        data: action.payload,
      };

    default:
      return state;
  }
};
