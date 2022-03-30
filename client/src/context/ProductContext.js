import React, { useContext, useReducer } from "react";
import reducer from "../reducers/ProductReducer";
import api from "./Api";
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
} from "../reducers/actions/ProductAction";

const ProductContext = React.createContext();

const initialState = {
  products: [],
  featuredProducts: [],
  singleProduct: {},
  brands: [],
  categories: [],
  properties: [],
  isProductLoading: false,
  isFilterLoading: false,
  isError: false,
  isFeaturedProductLoading: false,
  isFeaturedProductError: false,
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // response.data
  const fetchProducts = async () => {
    try {
      dispatch({ type: FETCH_PRODUCTS_BEGIN });
      const response = await api.get("/products");
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_PRODUCTS_ERROR });
    }
  };

  const fetchBrands = async () => {
    dispatch({ type: FETCH_BRANDS_BEGIN });
    try {
      const response = await api.get("/brands");
      const tempBrands = response.data;
      dispatch({ type: FETCH_BRANDS_SUCCESS, payload: tempBrands });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    dispatch({ type: FETCH_CATEGORIES_BEGIN });
    try {
      const response = await api.get("/products/categories");
      const tempCategories = response.data;
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: tempCategories });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperties = async (type) => {
    if (!type) return;
    const params = { type: type };
    dispatch({ type: FETCH_PROPERTIES_BEGIN });
    try {
      const response = await api.get("/products/properties", { params });
      dispatch({ type: FETCH_PROPERTIES_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  function toQueryString(paramsObject) {
    return Object.keys(paramsObject)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(paramsObject[key])}`
      )
      .join("&");
  }

  const fetchProductsWithFilter = async (filter) => {
    dispatch({ type: FETCH_PRODUCTS_BEGIN });
    let filterObj = {};
    Object.assign(filterObj, filter);
    try {
      // filter => query string
      // name

      // brand
      if (filterObj.brand === "") {
        delete filterObj.brand;
      }

      // rating
      filterObj.minRating = filterObj.rating[0];
      filterObj.maxRating = filterObj.rating[1];
      delete filterObj.rating;

      // price
      filterObj.minPrice = filterObj.price[0];
      filterObj.maxPrice = filterObj.price[1];
      delete filterObj.price;

      // featured
      if (filterObj.featured) {
        if (filterObj.featured === "all") {
          delete filterObj.featured;
        } else {
          filterObj.featured = filterObj.featured === "yes";
        }
      }

      const queryString = toQueryString(filterObj);
      const response = await api.get(`/products?${queryString}`);

      const filteredProducts = response.data;
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: filteredProducts });
    } catch (error) {
      console.log(error);
    }
    // dispatch({ type: FILTER_DISPLAY_PRODUCTS_SUCCESS, payload: tempArr });
  };

  const fetchFeaturedProducts = async () => {
    dispatch({ type: FETCH_FEATUREDPRODUCTS_BEGIN });
    try {
      const response = await api.get("/products/featured");
      let tempfeaturedProducts = [];
      if (response.data.length > 4) {
        for (let i = 0; i < 4; ++i) {
          tempfeaturedProducts.push(response.data[i]);
        }
      } else {
        tempfeaturedProducts = response.data;
      }

      dispatch({
        type: FETCH_FEATUREDPRODUCTS_SUCCESS,
        payload: tempfeaturedProducts,
      });
    } catch (error) {
      dispatch({
        type: FETCH_FEATUREDPRODUCTS_ERROR,
      });
    }
  };

  const fetchSingleProduct = async (id) => {
    dispatch({ type: FETCH_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await api.get(`/products/${id}`);
      console.log(response);
      if (response.data.length === 0) throw new Error("No Product Found!");
      dispatch({
        type: FETCH_SINGLE_PRODUCT_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: FETCH_SINGLE_PRODUCT_ERROR });
    }
  };

  return (
    <ProductContext.Provider
      value={{
        ...state,
        fetchProducts,
        fetchCategories,
        fetchProperties,
        fetchFeaturedProducts,
        fetchSingleProduct,
        fetchBrands,
        fetchProductsWithFilter,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
