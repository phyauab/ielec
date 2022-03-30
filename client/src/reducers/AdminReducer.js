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
  FETCH_BRANDS_BEGIN,
  FETCH_BRANDS_SUCCESS,
  FETCH_BRANDS_ERROR,
  FETCH_BRAND_BEGIN,
  FETCH_BRAND_SUCCESS,
  FETCH_BRAND_ERROR,
  ADD_PRODUCT_BEGIN,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  FETCH_USER_BEGIN,
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_ERROR,
  UPDATE_PRODUCT_BEGIN,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  UPDATE_BRAND_BEGIN,
  UPDATE_BRAND_SUCCESS,
  UPDATE_BRAND_ERROR,
  DELETE_USER_BEGIN,
  DELETE_USER_SUCCESS,
  DELETE_USER_ERROR,
  DELETE_PRODUCT_BEGIN,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  DELETE_BRAND_BEGIN,
  DELETE_BRAND_SUCCESS,
  DELETE_BRAND_ERROR,
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
    case FETCH_BRANDS_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        brands: action.payload,
      };
    case FETCH_BRAND_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_BRAND_SUCCESS:
    case FETCH_BRAND_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_BRANDS_ERROR:
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
    case FETCH_USER_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        isError: false,
      };
    case FETCH_USER_ERROR:
      return { ...state, isLoading: false, isError: true };
    case UPDATE_USER_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case UPDATE_USER_SUCCESS:
    case UPDATE_USER_ERROR:
      return { ...state, isLoading: false, isError: false };
    case FETCH_PRODUCT_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_PRODUCT_SUCCESS:
    case FETCH_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: true };
    case UPDATE_PRODUCT_BEGIN:
    case UPDATE_BRAND_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case UPDATE_PRODUCT_SUCCESS:
    case UPDATE_PRODUCT_ERROR:
    case UPDATE_BRAND_SUCCESS:
    case UPDATE_BRAND_ERROR:
      return { ...state, isLoading: false, isError: true };
    case DELETE_BRAND_BEGIN:
    case DELETE_USER_BEGIN:
    case DELETE_PRODUCT_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case DELETE_BRAND_SUCCESS:
    case DELETE_USER_SUCCESS:
    case DELETE_PRODUCT_SUCCESS:
      return { ...state, isLoading: false, isError: false };
    case DELETE_BRAND_ERROR:
    case DELETE_USER_ERROR:
    case DELETE_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: false };
    default:
      return { ...state };
  }
};

export default AdminReducer;
