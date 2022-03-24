import React, { useEffect } from "react";
import { useAdminContext } from "../../context/AdminContext";

// Components
import Title from "../../components/Admin/Title";
import Loading from "../../components/Loading";

// UI
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import MoreVertIcon from "@mui/icons-material/MoreVert";
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
      <Title title="Sales" />

      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={buildRows()}
          columns={buildColumns()}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Container>
  );
};

export default SalesPage;
