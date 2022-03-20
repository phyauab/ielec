import React from "react";
import { Switch, Link, Route, useRouteMatch } from "react-router-dom";

// UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// Icons
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";

// Pages
import {
  TransactionPage,
  SingleTransactionPage,
  MyAccountPage,
} from "../../pages";

const AccountLayout = ({ children }) => {
  let { path, url } = useRouteMatch();

  return (
    <Container sx={{ py: 10 }}>
      <Grid container spacing={5}>
        <Grid item xs={4}>
          <Paper sx={{ width: 320, maxWidth: "100%" }}>
            <MenuList>
              <Link to={url}>
                <MenuItem>
                  <ListItemIcon>
                    <AccountBoxIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
              </Link>
              <Divider />
              <Link to={`${url}/transactions`}>
                <MenuItem>
                  <ListItemIcon>
                    <ReceiptLongIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Transactions</ListItemText>
                </MenuItem>
              </Link>
            </MenuList>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Switch>
            <Route exact path={path}>
              <MyAccountPage />
            </Route>
            <Route exact path={`${path}/transactions`}>
              <TransactionPage />
            </Route>
            <Route path={`${path}/transactions/:id`}>
              <SingleTransactionPage />
            </Route>
            <Route path="/account/profile">
              <p>profile</p>
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AccountLayout;
