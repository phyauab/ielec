import React, { useEffect, useState } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { Link } from "react-router-dom";

// components
import BreadCrumb from "../../components/BreadCrumb";
import TransactionList from "../../components/Transactions/TransactionList";
import TransactionItemList from "../../components/Transactions/TransactionItemList";

// UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Loading from "../../components/Loading";

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" to="/">
    Home
  </Link>,
  <Typography key="3" color="text.primary">
    Transactions
  </Typography>,
];

const TransactionPage = () => {
  const [transactionIndex, setTransactionIndex] = useState(0);
  const { transactions, fetchTransactions, isLoading } =
    useTransactionContext();

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  console.log("0------");
  console.log(transactions);

  return (
    <Container>
      {/* <BreadCrumb breadcrumbs={breadcrumbs} /> */}

      <TransactionList
        transactions={transactions}
        setTransactionIndex={setTransactionIndex}
      />

      {/* <Grid item xs={8}>
          <TransactionItemList
            cartItems={transactions[transactionIndex].cartItems}
          />
        </Grid> */}

      {/* <p>this is my transaction page</p> */}
    </Container>
  );
};

export default TransactionPage;
