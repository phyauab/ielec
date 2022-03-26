import React, { useContext, useState } from "react";

const AppContext = React.createContext();

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
