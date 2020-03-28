const initialState = {
  page: "NOT_SIGNED_UP",
  phone: null,
  condition: null,
  ttl: null
};

export function MyActivitiesReducer(state = initialState, action) {
  switch (action.type) {
    case "SHOW_SIGN_UP_PAGE":
      return {
        ...state,
        page: "SIGN_UP"
      };
    case "SHOW_NOT_SIGNED_UP_PAGE":
      return {
        ...state,
        page: "NOT_SIGNED_UP"
      };
    case "SHOW_ACTIVATION_PAGE":
      return {
        ...state,
        page: "ACTIVATION",
        phone: action.phone,
        condition: action.condition,
        ttl: action.ttl
      };
    case "ACTIVATE_USER":
      return {
        ...state,
        page: "INDEX"
      };
    default:
      return state;
  }
}
