import {
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PHONE_SUCCESS,
  FETCH_LAPTOP_SUCCESS,
  FETCH_HEADPHONE_SUCCESS,
  FETCH_ACCESSORIES_SUCCESS,
  FETCH_PRODUCT_ERROR,
  CHANGE_DISPLAY_PRODUCT,
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_PROPERTIES_BEGIN,
  FETCH_PROPERTIES_SUCCESS,
} from "./actions/ProductAction";

const ProductRecuder = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_BEGIN:
    case FETCH_CATEGORIES_BEGIN:
    case FETCH_PROPERTIES_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_PHONE_SUCCESS:
      return {
        ...state,
        phones: action.payload,
        displayProducts: action.payload,
        isLoading: false,
      };
    case FETCH_LAPTOP_SUCCESS:
      return {
        ...state,
        laptops: action.payload,
        displayProducts: action.payload,
        isLoading: false,
      };
    case FETCH_HEADPHONE_SUCCESS:
      return {
        ...state,
        headphones: action.payload,
        displayProducts: action.payload,
        isLoading: false,
      };
    case FETCH_ACCESSORIES_SUCCESS:
      return {
        ...state,
        accessories: action.payload,
        displayProducts: action.payload,
        isLoading: false,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case FETCH_PROPERTIES_SUCCESS:
      return { ...state, properties: action.payload, isLoading: false };
    case FETCH_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: true };
    case CHANGE_DISPLAY_PRODUCT:
      return { ...state, displayProducts: action.payload, isLoading: false };
  }
  return { ...state };
};

export default ProductRecuder;
