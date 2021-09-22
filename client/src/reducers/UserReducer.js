import {
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
  LOGOUT_USER_BEGIN,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_ERROR,
  SIGNUP_USER_BEGIN,
  SIGNUP_USER_SUCCESS,
  SIGNUP_USER_ERROR,
} from "./actions/UserAction";

const UserReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER_BEGIN:
    case LOGOUT_USER_BEGIN:
    case SIGNUP_USER_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case LOGIN_USER_SUCCESS:
    case SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOGOUT_USER_SUCCESS:
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        user: null,
        token: null,
      };
    case LOGOUT_USER_ERROR:
    case SIGNUP_USER_ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
      throw new Error("Something wrong");
  }
};

export default UserReducer;
