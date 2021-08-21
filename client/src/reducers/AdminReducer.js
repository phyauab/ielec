import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_END,
  FETCH_PROPERTIES_BEGIN,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_PROPERTIES_END,
} from "./actions/AdminAction";

const AdminReducer = (state, action) => {
  switch (action.type) {
    case FETCH_CATEGORIES_BEGIN:
    case FETCH_PROPERTIES_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case FETCH_PROPERTIES_SUCCESS:
      return { ...state, properties: action.payload, isLoading: false };
    default:
      return { ...state };
  }
};

export default AdminReducer;
