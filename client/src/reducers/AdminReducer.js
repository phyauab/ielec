import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  // FETCH_USERS_ERROR,
} from "./actions/AdminAction";

const AdminReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      return { ...state, isLoading: true };
    case FETCH_USERS_SUCCESS:
      console.log(action.payload);
      return { ...state, isLoading: false, users: action.payload };

    default:
      return { ...state };
  }
};

export default AdminReducer;
