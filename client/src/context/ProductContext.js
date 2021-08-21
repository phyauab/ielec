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
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const BASE_URL = "http://localhost:4000";
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: 5000,
  });

  // response.data
  const fetchProducts = async (category) => {
    if (state[category.toString()].length !== 0) {
      const tempArr = state[category.toString()].slice();
      return dispatch({ type: CHANGE_DISPLAY_PRODUCT, payload: tempArr });
    }

    try {
      dispatch({ type: FETCH_PRODUCT_BEGIN });
      switch (category) {
        case "phones":
          const responsePhone = await api.get("/products/phones");
          console.log(responsePhone);
          dispatch({ type: FETCH_PHONE_SUCCESS, payload: responsePhone.data });
          break;
        case "laptops":
          const responseLaptop = await api.get("/products/laptops");
          console.log(responseLaptop);
          dispatch({
            type: FETCH_LAPTOP_SUCCESS,
            payload: responseLaptop.data,
          });
          break;
        case "headphones":
          const responseHeadphone = await api.get("/products/headphones");
          console.log(responseHeadphone);
          dispatch({
            type: FETCH_HEADPHONE_SUCCESS,
            payload: responseHeadphone.data,
          });
          break;
        case "accessories":
          const responseAccessories = await api.get("/products/accessories");
          console.log(responseAccessories);
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
      const tempProperties = [];
      const object = response.data;
      for (const property in object) {
        if (property != "_id" && property != "__v" && property != "category") {
          const type = object[property].instance;
          tempProperties.push({ property, type });
        }
      }
      dispatch({ type: FETCH_PROPERTIES_SUCCESS, payload: tempProperties });
    } catch (error) {
      console.log(error);
    }
  };

  const setDisplayProducts = () => {};

  return (
    <ProductContext.Provider
      value={{ ...state, fetchProducts, fetchCategories, fetchProperties }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  return useContext(ProductContext);
};
