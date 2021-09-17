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

  const test = asyn;

  // response.data
  const fetchProducts = async (category, params) => {
    // if the array is not empty, then no need to fetch
    if (state[category.toString()].length !== 0) {
      setDisplayProducts(category);
      return;
    }

    try {
      dispatch({ type: FETCH_PRODUCT_BEGIN });
      switch (category) {
        case "phones":
          const responsePhone = await api.get("/products/phones");

          dispatch({ type: FETCH_PHONE_SUCCESS, payload: responsePhone.data });
          break;
        case "laptops":
          const responseLaptop = await api.get("/products/laptops");

          dispatch({
            type: FETCH_LAPTOP_SUCCESS,
            payload: responseLaptop.data,
          });
          break;
        case "headphones":
          const responseHeadphone = await api.get("/products/headphones");

          dispatch({
            type: FETCH_HEADPHONE_SUCCESS,
            payload: responseHeadphone.data,
          });
          break;
        case "accessories":
          const responseAccessories = await api.get("/products/accessories");

          dispatch({
            type: FETCH_ACCESSORIES_SUCCESS,
            payload: responseAccessories.data,
          });
          break;
        default:
          dispatch({ type: FETCH_PRODUCT_ERROR });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_PRODUCT_ERROR });
    }
  };

  const fetchCategories = async () => {
    dispatch({ type: FETCH_CATEGORIES_BEGIN });
    try {
      const response = await api.get("/products/categories");
      const tempCategories = response.data.map((category) => {
        if (category != "Accessories") {
          return category.concat("s").toLowerCase();
        }
        return category.toLowerCase();
      });
      dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: tempCategories });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProperties = async () => {
    dispatch({ type: FETCH_PROPERTIES_BEGIN });
    try {
      const response = await api.get("/products/properties");
      const { properties } = response.data;
      dispatch({ type: FETCH_PROPERTIES_SUCCESS, payload: properties });
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
