export const ProvinceStatisticsReducer = (state = {}, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return state;
    case "FETCH_SUCCESS":
      return {...state, data: action.payload};
    default:
      return state;
  }
}
