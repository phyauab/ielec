import React from "react";
import { useTransactionContext } from "../../context/TransactionContext";
import { Link, useRouteMatch } from "react-router-dom";

// Components
import Loading from "../Loading";

// UI
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";

// Icon
import ReceiptIcon from "@mui/icons-material/Receipt";

const TransactionList = ({ transactions }) => {
  const { isLoading } = useTransactionContext();
  let { url } = useRouteMatch();
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return (
    <Box sx={{ width: "100%" }}>
      {transactions.length === 0 && (
        <Typography variant="body1" align="center">
          There are no transactions
        </Typography>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <List>
          {transactions.map((transaction, index) => {
            return (
              <Link key={index} to={`${url}/${transaction._id}`}>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar>
                        <ReceiptIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={`$${transaction.amount}`}
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
