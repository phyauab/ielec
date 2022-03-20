import React from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { Switch, Link, Route, useRouteMatch } from "react-router-dom";

// Components
import Loading from "../Loading";

// UI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// Icon
import ReceiptIcon from "@mui/icons-material/Receipt";

const TransactionList = ({ transactions, setTransactionIndex }) => {
  const { fetchTransactions, isLoading } = useTransactionContext();
  let { path, url } = useRouteMatch();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Box sx={{ width: "100%", bgcolor: "#f2f2f2" }}>
      {isLoading ? (
        <Loading />
      ) : (
        <List>
          {transactions.map((transaction, index) => {
            return (
              <Link key={index} to={`${url}/${transaction._id}`}>
                <ListItem disablePadding>
                  <ListItemButton onClick={(e) => setTransactionIndex(index)}>
                    <ListItemAvatar>
                      <Avatar>
                        <ReceiptIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`\$${transaction.amount}`}
                      secondary={new Date(
                        transaction.createdAt
                      ).toLocaleDateString("en-US", options)}
                    />
                  </ListItemButton>
                </ListItem>
              </Link>
            );
          })}
        </List>
      )}
    </Box>
  );
};

export default TransactionList;
