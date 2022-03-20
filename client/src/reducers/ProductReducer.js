import {
  FETCH_PRODUCTS_BEGIN,
  FETCH_PRODUCTS_SUCCESS,
  FETCH_PRODUCTS_ERROR,
  FETCH_FEATUREDPRODUCTS_BEGIN,
  FETCH_FEATUREDPRODUCTS_SUCCESS,
  FETCH_FEATUREDPRODUCTS_ERROR,
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_PROPERTIES_BEGIN,
  FETCH_PROPERTIES_SUCCESS,
  FETCH_SINGLE_PRODUCT_BEGIN,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_ERROR,
  FETCH_BRANDS_BEGIN,
  FETCH_BRANDS_SUCCESS,
  // FETCH_BRANDS_ERROR,
} from "./actions/ProductAction";

const ProductRecuder = (state, action) => {
  switch (action.type) {
    case FETCH_BRANDS_BEGIN:
      return { ...state, isFilterLoading: true, isError: false };
    case FETCH_FEATUREDPRODUCTS_BEGIN:
      return { ...state, isFeaturedProductLoading: true, isError: false };
    case FETCH_FEATUREDPRODUCTS_SUCCESS:
      return {
        ...state,
        isFeaturedProductLoading: false,
        isError: false,
        featuredProducts: action.payload,
      };
    case FETCH_FEATUREDPRODUCTS_ERROR:
      return {
        ...state,
        isFeaturedProductLoading: false,
        isError: true,
      };
    case FETCH_PRODUCTS_BEGIN:
    case FETCH_CATEGORIES_BEGIN:
    case FETCH_PROPERTIES_BEGIN:
    case FETCH_SINGLE_PRODUCT_BEGIN:
      return { ...state, isProductLoading: true, isError: false };
    case FETCH_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
        isProductLoading: false,
      };
    case FETCH_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        singleProduct: action.payload,
        isProductLoading: false,
      };
    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, categories: action.payload, isLoading: false };
    case FETCH_PROPERTIES_SUCCESS:
      return { ...state, properties: action.payload, isLoading: false };
    case FETCH_BRANDS_SUCCESS:
      return {
        ...state,
        isFilterLoading: false,
        brands: action.payload,
      };
    case FETCH_PRODUCTS_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_SINGLE_PRODUCT_ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
  }
  return { ...state };
};

export default ProductRecuder;
