import React from "react";
import { useAdminContext } from "../../../context/AdminContext";

// UI
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Toolbar from "@mui/material/Toolbar";

const TopProductsCard = () => {
  const { dashboard } = useAdminContext();
  return (
    <Card>
      <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Top Selling Products
        </Typography>
      </Toolbar>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell variant="head">Product Name</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Sales Quantity</TableCell>
              <TableCell align="right">Base Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dashboard.topProducts.map((product, index) => {
              return (
                <TableRow
                  key={product.name}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {product.name}
                  </TableCell>
                  <TableCell align="right">{product.qty}</TableCell>
                  <TableCell align="right">{product.sales}</TableCell>
                  <TableCell align="right">
                    $
                    {product.price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default TopProductsCard;
