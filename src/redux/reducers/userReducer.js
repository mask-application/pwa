// PRERELEASE - before release change initialState to token : null and loggedIn:false just for development
const initialState = {
  token: "",
  loggedIn: false
};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, token: action.token, loggedIn: true };
    case "LOGOUT":
      return { ...initialState };
    default:
      return state;
  }
};
