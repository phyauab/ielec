import {
  FETCH_CART_BEGIN,
  FETCH_CART_SUCCESS,
  FETCH_CART_ERROR,
  ADD_CARTITEM_BEGIN,
  ADD_CARTITEM_SUCCESS,
  ADD_CARTITEM_ERROR,
} from "./actions/CartAction";

const CartRecuder = (state, action) => {
  switch (action.type) {
    case FETCH_CART_BEGIN:
      return { ...state, isFilterLoading: true, isError: false };
  }
  return { ...state };
};

export default CartRecuder;
