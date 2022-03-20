import React, { useEffect } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import TransactionItemList from "../../components/Transactions/TransactionItemList";
import { useParams } from "react-router-dom";

// Components
import Loading from "../../components/Loading";

const SingleTransactionPage = () => {
  const { fetchTransaction, isLoading, transaction } = useTransactionContext();
  let { id } = useParams();

  useEffect(() => {
    fetchTransaction(id);
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  console.log("this is single transaction");
  console.log(transaction);
  console.log("isEmpty: " + Object.keys(transaction).length === 0);
  if (Object.keys(transaction).length === 0) {
    return <></>;
  }

  console.log("transctions.cartItems");
  console.log(transaction.cartItems);

  return <TransactionItemList cartItems={transaction.cartItems} />;
};

export default SingleTransactionPage;
