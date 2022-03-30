import React from "react";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const StorageOption = ({ storage, options, setOptions }) => {
  if (!options.storage) return <></>;
  return (
    <Card
      onClick={() => setOptions({ ...options, storage: storage })}
      sx={{
        borderColor:
          options.storage._id === storage._id ? "#2b75e3" : "#C5C5C5",
        borderWidth: "1px",
        borderStyle: "solid",
        boxShadow: "none",
        borderRadius: "15px ",
        "&:hover": {
          borderColor:
            options.storage._id === storage._id ? "#2b75e3" : "#616161",
          cursor: "pointer",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h5">
          {storage.size}
          {storage.unit}
        </Typography>
        <Typography variant="caption">+${storage.additionalPrice}</Typography>
      </CardContent>
    </Card>
  );
};

export default StorageOption;
