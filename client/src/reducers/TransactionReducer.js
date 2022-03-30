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
} from "./actions/TransactionAction";

const TransactionRecuder = (state, action) => {
  switch (action.type) {
    case TRANSACTION_BEGIN:
    case TRANSACTION_SUCCESS:
    case TRANSACTION_ERROR:
    case FETCH_TRANSACTION_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_TRANSACTION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        transactions: action.payload,
      };
    case FETCH_TRANSACTION_ERROR:
      return { ...state, isLoading: false, isError: true };
    case FETCH_SINGLE_TRANSACTION_BEGIN:
      return { ...state, isLoading: true, isError: false };
    case FETCH_SINGLE_TRANSACTION_SUCCESS:
      return {
        ...state,
        transaction: action.payload,
        isLoading: false,
        isError: false,
      };
    case FETCH_SINGLE_TRANSACTION_ERROR:
      return { ...state, isLoading: false, isError: true };
    default:
  }
  return { ...state };
};

export default TransactionRecuder;
