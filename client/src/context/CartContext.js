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
  REMOVE_CARTITEM_BEGIN,
  REMOVE_CARTITEM_SUCCESS,
  REMOVE_CARTITEM_ERROR,
} from "../reducers/actions/CartAction";

const CartContext = React.createContext();

const initialState = {
  cartItems: [],
  isCartLoading: false,
  isCartError: false,
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchCartItems = async () => {
    try {
      dispatch({ type: FETCH_CART_BEGIN });
      const response = await api.get("/cartItems");
      console.log(response);
      dispatch({ type: FETCH_CART_SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error.message);
      dispatch({ type: FETCH_CART_ERROR });
    }
  };

  // product = productId
  const addToCart = async (product, options, qty) => {
    let optionsArr = [];
    for (const property in options) {
      optionsArr = [...optionsArr, options[property]];
    }
    try {
      dispatch({ type: ADD_CARTITEM_BEGIN });
      const response = await api.post("/cartItems", {
        product: product,
        options: optionsArr,
        qty: qty,
      });
      dispatch({ type: ADD_CARTITEM_SUCCESS, payload: response.data });
      return true;
    } catch (error) {
      console.log(error);
      dispatch({ type: ADD_CARTITEM_ERROR });
      return false;
    }
  };

  const removeFromCart = async (cartItemId) => {
    try {
      dispatch({ type: REMOVE_CARTITEM_BEGIN });
      const response = await api.delete(`/cartItems/${cartItemId}`);
      let itemIndex = 0;
      for (let i = 0; i < state.cartItems.length; ++i) {
        if (state.cartItems[i]._id === cartItemId) {
          itemIndex = i;
        }
      }
      let newCartItems = state.cartItems.splice(itemIndex, 1);
      dispatch({ type: REMOVE_CARTITEM_SUCCESS, payload: state.cartItems });
      return true;
    } catch (error) {
      console.log(error);
      dispatch({ type: REMOVE_CARTITEM_ERROR });
      return false;
    }
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        fetchCartItems,
        addToCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
