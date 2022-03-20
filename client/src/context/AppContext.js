import React, { useContext, useState, useReducer, useEffect } from "react";

// UI
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const AppContext = React.createContext();

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const AppProvider = ({ children }) => {
  const [snackbarState, setSnackbarState] = useState({
    open: false,
    msg: "",
    severity: "success",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarState({ ...snackbarState, open: false });
  };

  const showMessage = (msg, severity) => {
    // console.log("show message");
    setSnackbarState({ open: true, msg: msg, severity: severity });
  };

  return (
    <AppContext.Provider
      value={{
        showMessage,
        handleSnackbarClose,
        snackbarState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
