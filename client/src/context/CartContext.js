import React, { useContext, useReducer } from "react";
import reducer from "../reducers/CartReducer";
import api from "./Api";
import {
  FETCH_CART_BEGIN,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  ADD_CARTITEM_BEGIN,
  ADD_CARTITEM_SUCCESS,
  ADD_CARTITEM_ERROR,
} from "../reducers/actions/CartAction";

const CartContext = React.createContext();

const initialState = {
  cartItems: [],
  isCartLoading: true,
  isCartError: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCartItems = async () => {
    try {
      dispatch({ type: FETCH_CART_BEGIN });
      const response = await api.get("/cartItems");
      dispatch({ type: FETCH_CART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: FETCH_CART_ERROR });
    }
  };

  const addToCart = async () => {
    try {
      dispatch({ type: ADD_CARTITEM_BEGIN });
      const response = await api.get("/cartItems");
      dispatch({ type: ADD_CARTITEM_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_CARTITEM_ERROR });
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        fetchCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
