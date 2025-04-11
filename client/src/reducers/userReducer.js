const initialState = null; // Define an initial state

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payload; // Set user details on login
    case "LOGOUT":
      return null; // Clear user state on logout
    default:
      return state; // Return the current state for unhandled actions
  }
};
