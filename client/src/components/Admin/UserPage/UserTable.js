import React, { useState, useEffect } from "react";

// Context
import { useAdminContext } from "../../../context/AdminContext";

// UI
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  TableContainer,
  TablePagination,
  IconButton,
  TableBody,
  Paper,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

// Icons
import MoreVertIcon from "@mui/icons-material/MoreVert";

const UserTable = () => {
  const { users, fetchUsers } = useAdminContext();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("username");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const descendingComparator = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = (order, orderBy) => {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const stableSort = (array, comparator) => {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  };

  const buildTableHead = (order, orderBy, onRequestSort) => {
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    const headCells = [
      {
        id: "username",
        numeric: false,
        disablePadding: false,
        label: "Username",
      },
      {
        id: "role",
        numeric: false,
        disablePadding: false,
        label: "Role",
      },
      {
        id: "email",
        numeric: false,
        disablePadding: false,
        label: "Email",
      },
    ];

    return (
      <TableHead>
        <TableRow>
          {headCells.map((headcell) => {
            const { id, numeric, disablePadding, label } = headcell;
            return (
              <TableCell
                key={id}
                align={numeric ? "right" : "left"}
                padding={disablePadding ? "none" : "normal"}
                sortDirection={orderBy === id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === id}
                  direction={orderBy === id ? order : "asc"}
                  onClick={createSortHandler(id)}
                >
                  {label}
                  {orderBy === id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            );
          })}
          {/* Actions */}
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
    );
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Box sx={{ width: "100%", minHeight: "600px" }}>
      <Paper sx={{ boxShadow: 3, borderRadius: 3, width: "100%", mb: 2 }}>
        <TableContainer>
          <Table>
            {buildTableHead(order, orderBy, handleRequestSort)}
            <TableBody>
              {stableSort(users, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => {
                  const { _id, username, email, isAdmin } = user;
                  return (
                    <TableRow key={_id}>
                      <TableCell align="left">
                        <TableSortLabel>{username}</TableSortLabel>
                      </TableCell>
                      <TableCell align="left">
                        {isAdmin ? "Admin" : "User"}
                      </TableCell>
                      <TableCell align="left">{email}</TableCell>
                      <TableCell align="left">
                        <IconButton>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UserTable;
