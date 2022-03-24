import {
  FETCH_USERS_BEGIN,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_ERROR,
  FETCH_DASHBOARD_BEGIN,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_ERROR,
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_TRANSACTONS_BEGIN,
  FETCH_TRANSACTONS_SUCCESS,
  FETCH_TRANSACTONS_ERROR,
  FETCH_BRAND_BEGIN,
  FETCH_BRAND_SUCCESS,
  FETCH_BRAND_ERROR,
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
} from "./actions/AdminAction";

const AdminReducer = (state, action) => {
  switch (action.type) {
    case FETCH_USERS_BEGIN:
      return { ...state, isLoading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, isLoading: false, users: action.payload };
    case FETCH_USERS_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_DASHBOARD_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
        isLoading: false,
        isError: false,
      };
    case FETCH_DASHBOARD_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_PRODUCTS_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
      };
    case FETCH_PRODUCTS_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_TRANSACTONS_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_TRANSACTONS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        transactions: action.payload,
      };
    case FETCH_TRANSACTONS_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_BRAND_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_BRAND_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        brands: action.payload,
      };
    case FETCH_BRAND_ERROR:
      return { ...state, isLoading: false, isError: true };
    case ADD_PRODUCT_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
      };
    case ADD_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
      return { ...state };
  }
};

export default AdminReducer;
