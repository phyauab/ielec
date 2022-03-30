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
} from "./actions/CartAction";

const CartRecuder = (state, action) => {
  switch (action.type) {
    case FETCH_CART_BEGIN:
      return { ...state, isCartLoading: true, isError: false };
    case FETCH_CART_SUCCESS:
      return {
        ...state,
        cartItems: action.payload,
        isCartLoading: false,
        isError: false,
      };
    case FETCH_CART_ERROR:
    case ADD_CARTITEM_BEGIN:
      return { ...state, isCartLoading: true, isError: false };
    case ADD_CARTITEM_SUCCESS:
      return { ...state, isCartLoading: false, isError: false };
    case ADD_CARTITEM_ERROR:
      return { ...state, isCartLoading: false, isError: true };
    case REMOVE_CARTITEM_BEGIN:
      return { ...state, isCartLoading: true, isError: false };
    case REMOVE_CARTITEM_SUCCESS:
      return {
        ...state,
        isCartLoading: false,
        isError: false,
        cartItems: action.payload,
      };
    case REMOVE_CARTITEM_ERROR:
      return {
        ...state,
        isCartLoading: false,
        isError: true,
      };
    default:
  }
  return { ...state };
};

export default CartRecuder;
