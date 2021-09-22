import React, { useContext, useReducer } from "react";
import reducer from "../reducers/ProductReducer";
import axios from "axios";
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
  FILTER_DISPLAY_PRODUCTS_BEGIN,
  FILTER_DISPLAY_PRODUCTS_SUCCESS,
  FILTER_DISPLAY_PRODUCTS_ERROR,
  FETCH_SINGLE_PRODUCT_BEGIN,
  FETCH_SINGLE_PRODUCT_SUCCESS,
  FETCH_SINGLE_PRODUCT_ERROR,
} from "../reducers/actions/ProductAction";

const ProductContext = React.createContext();

const initialState = {
  isLoading: false,
  isError: false,
  phones: [],
  laptops: [],
  headphones: [],
  accessories: [],
  displayProducts: [],
  categories: [],
  properties: [],
  singleProduct: {},
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const BASE_URL = "http://localhost:4000";
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  // response.data
  const fetchProducts = async (category, params) => {
    // if the array is not empty, then no need to fetch
    // if (state[category.toString()].length !== 0) {
    //   setDisplayProducts(category);
    //   return;
    // }

    try {
      dispatch({ type: FETCH_PRODUCT_BEGIN });
      const response = await api.get("/products");
      dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_PRODUCT_ERROR });
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

  const setDisplayProducts = async (category) => {
    const tempArr = state[category.toString()].slice();
    dispatch({ type: CHANGE_DISPLAY_PRODUCT, payload: tempArr });
  };

  const filterDisplayProducts = (filter, category) => {
    dispatch({ type: FILTER_DISPLAY_PRODUCTS_BEGIN });
    var tempArr = state[category];
    for (const property in filter) {
      if (property === "price") {
        tempArr = tempArr.filter(
          (item) =>
            item.price >= filter[property][0] &&
            item.price <= filter[property][1]
        );
      } else if (property === "rating") {
        tempArr = tempArr.filter(
          (item) =>
            item.rating >= filter[property][0] &&
            item.rating <= filter[property][1]
        );
      } else if (property === "name") {
        tempArr = tempArr.filter((item) =>
          item[property].toLowerCase().includes(filter[property].toLowerCase())
        );
      } else {
        tempArr = tempArr.filter((item) =>
          filter[property].includes(item[property])
        );
      }
    }
    dispatch({ type: FILTER_DISPLAY_PRODUCTS_SUCCESS, payload: tempArr });
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.get("/products", {
        params: {
          featured: true,
        },
      });
      const tempfeaturedProducts = [];
      if (response.data.length > 4) {
        for (let i = 0; i < 4; ++i) tempfeaturedProducts.push(response.data[i]);
        return tempfeaturedProducts;
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const fetchSingleProduct = async (id) => {
    dispatch({ type: FETCH_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await api.get("/products", {
        params: {
          _id: id,
        },
      });
      console.log(response);
      if (response.data.length === 0) throw new Error("No Product Found!");
      dispatch({
        type: FETCH_SINGLE_PRODUCT_SUCCESS,
        payload: response.data[0],
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
        filterDisplayProducts,
        fetchFeaturedProducts,
        fetchSingleProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
