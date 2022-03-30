import React, { useContext, useReducer } from "react";
import reducer from "../reducers/TransactionReducer";
import api from "./Api";
import { useCartContext } from "./CartContext";
import {
  TRANSACTION_BEGIN,
  TRANSACTION_SUCCESS,
  TRANSACTION_ERROR,
  FETCH_TRANSACTION_BEGIN,
  FETCH_TRANSACTION_SUCCESS,
  FETCH_TRANSACTION_ERROR,
  FETCH_SINGLE_TRANSACTION_BEGIN,
  FETCH_SINGLE_TRANSACTION_SUCCESS,
  FETCH_SINGLE_TRANSACTION_ERROR,
} from "../reducers/actions/TransactionAction";

const TransactionContext = React.createContext();

const initialState = {
  transactions: [],
  transaction: {},
  isLoading: false,
  isError: false,
};

export const TransactionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { fetchCartItems } = useCartContext();

  const checkout = async () => {
    try {
      dispatch({ type: TRANSACTION_BEGIN });
      const response = await api.post("/transactions");
      console.log(response);
      dispatch({ type: TRANSACTION_SUCCESS });
      fetchCartItems();
    } catch (error) {
      console.log(error.message);
      dispatch({ type: TRANSACTION_ERROR });
    }
  };

  const fetchTransactions = async () => {
    try {
      dispatch({ type: FETCH_TRANSACTION_BEGIN });
      const response = await api.get("/transactions");
      dispatch({
        type: FETCH_TRANSACTION_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: FETCH_TRANSACTION_ERROR });
    }
  };

  const fetchTransaction = async (id) => {
    try {
      dispatch({ type: FETCH_SINGLE_TRANSACTION_BEGIN });
      const response = await api.get(`/transactions/${id}`);
      dispatch({
        type: FETCH_SINGLE_TRANSACTION_SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      console.log(e);
      dispatch({ type: FETCH_SINGLE_TRANSACTION_ERROR });
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        ...state,
        checkout,
        fetchTransactions,
        fetchTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
