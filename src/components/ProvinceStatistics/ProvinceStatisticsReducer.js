import {
  FETCH_REQUEST,
  FETCH_SUCCESS
} from './ProvinceStatisticsActions';

const initialState = {
  isLoaded: false,
  patients: [],
  dead: [],
  recovered: []
};

export const ProvinceStatisticsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST:
      return state;

    case FETCH_SUCCESS:
      return {
        ...state,
        isLoaded: true,
        patients: action.payload.iran.patients,
        dead: action.payload.iran.dead,
        recovered: action.payload.iran.recovered,
      };

    default:
      return state;
  }
}
