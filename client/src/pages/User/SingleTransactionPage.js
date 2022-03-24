import React, { useEffect } from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import TransactionItemList from "../../components/Transactions/TransactionItemList";
import { useParams } from "react-router-dom";

// Components
import Loading from "../../components/Loading";

// UI
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

const SingleTransactionPage = () => {
  const { fetchTransaction, isLoading, transaction } = useTransactionContext();
  let { id } = useParams();

  useEffect(() => {
    fetchTransaction(id);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (Object.keys(transaction).length === 0) {
    return <></>;
  }

  return (
    <Paper sx={{ p: 5 }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Transaction Information</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={2}>
              <Typography variant="subtitle2">ID: </Typography>
              <Typography variant="subtitle2">Amount: </Typography>
              <Typography variant="subtitle2">Date: </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2">{transaction._id}</Typography>
              <Typography variant="subtitle2">${transaction.amount}</Typography>
              <Typography variant="subtitle2">
                {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <TransactionItemList cartItems={transaction.cartItems} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SingleTransactionPage;
