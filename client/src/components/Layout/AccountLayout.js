import React from "react";
import { Switch, Link, Route, useRouteMatch } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

// UI
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

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
  const { logout } = useUserContext();
  let { path, url } = useRouteMatch();

  return (
    <Container sx={{ py: 10 }}>
      <Grid container spacing={5}>
        <Grid item xs={3}>
          <Paper>
            <MenuList>
              <Link to={url}>
                <MenuItem divider>
                  <ListItemIcon>
                    <AccountBoxIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
              </Link>
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
          <Box sx={{ py: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => logout()}
            >
              Logout
            </Button>
          </Box>
        </Grid>
        <Grid item xs={1}></Grid>
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
