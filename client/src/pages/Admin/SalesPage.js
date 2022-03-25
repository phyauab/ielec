import React, { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";

// Components
import Title from "../../components/Admin/Title";
import Loading from "../../components/Loading";

// UI
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import { DataGrid } from "@mui/x-data-grid";

const SalesPage = () => {
  const { fetchTransactions, isLoading, transactions } = useAdminContext();

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const buildColumns = () => {
    let columns = [
      {
        field: "id",
        headerName: "ID",
        width: 230,
      },
      { field: "customer", headerName: "Customer", width: 230 },
      { field: "numOfItems", headerName: "No. of items", width: 100 },
      { field: "amount", headerName: "Amount", width: 100 },
      {
        field: "createdAt",
        headerName: "Date",
        type: "date",
        width: 220,
      },
    ];
    return columns;
  };

  const buildRows = () => {
    let rows = [];
    for (const transaction of transactions) {
      rows.push({
        id: transaction._id,
        customer: transaction.user,
        numOfItems: transaction.cartItems.length,
        amount: `$${transaction.amount}`,
        createdAt: new Date(transaction.createdAt).toLocaleDateString(
          "en-US",
          options
        ),
      });
    }
    return rows;
  };

  return (
    <Container>
      <Toolbar />
      <Title title="Sales" />

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={buildRows()}
          columns={buildColumns()}
          pageSize={10}
          rowsPerPageOptions={[10]}
          autoHeight
        />
      </div>
    </Container>
  );
};

export default SalesPage;
