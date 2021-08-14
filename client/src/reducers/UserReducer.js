import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./actions/UserAction";

const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER_BEGIN:
      return { ...state, isLoading: true };
    case LOGIN_USER_SUCCESS:
      const { user, token } = action.payload;
      return { ...state, isLoading: false, isLoggedIn: true, user, token };
    case LOGIN_USER_ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error("Something wrong");
  }
};

export default UserReducer;
