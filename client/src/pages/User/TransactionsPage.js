import React, { useEffect } from "react";
import { useTransactionContext } from "../../context/TransactionContext";

// components
import TransactionList from "../../components/Transactions/TransactionList";
import Loading from "../../components/Loading";

// UI
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Divider from "@mui/material/Divider";

// const breadcrumbs = [
//   <Link underline="hover" key="1" color="inherit" to="/">
//     Home
//   </Link>,
//   <Typography key="3" color="text.primary">
//     Transactions
//   </Typography>,
// ];

const TransactionPage = () => {
  const { transactions, fetchTransactions, isLoading } =
    useTransactionContext();

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Paper sx={{ p: 5 }}>
      <Grid container rowSpacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4">Transactions</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <TransactionList transactions={transactions} />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default TransactionPage;
