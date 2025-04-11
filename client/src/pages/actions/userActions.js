// actions/userActions.js
export const login = (userData) => {
    return (dispatch) => {
      // Assuming userData contains the token and other user details
      dispatch({
        type: 'USER_LOGIN',
        payload: userData, // userData should include the token and other user information
      });
    };
  };
  