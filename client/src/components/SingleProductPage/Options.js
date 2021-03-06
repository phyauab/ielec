import React from "react";

// Components
import ColorOption from "../Options/ColorOption";
import RamOption from "../Options/RamOption";
import SsdOption from "../Options/SsdOption";
import StorageOption from "../Options/StorageOption";

// UI
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Option = ({ property, optionsArr, options, setOptions }) => {
  const getTitle = () => {
    switch (property) {
      case "color":
        return "Pick a color";
      case "ram":
        return "Pick a ram size";
      case "storage":
        return "Pick a storage size";
      case "ssd":
        return "Pick a SSD size";
      case "anc":
        return "Active Noise Cancellation";
      case "wired":
        return "Wired";
      default:
        return "Pick one";
    }
  };
  const getOptions = () => {
    switch (property) {
      case "color":
        return optionsArr.map((option, index) => {
          return (
            <Grid key={index} item xs={6}>
              <ColorOption
                color={option}
                options={options}
                setOptions={setOptions}
              />
            </Grid>
          );
        });
      case "ram":
        return optionsArr.map((option, index) => {
          return (
            <Grid key={index} item xs={6}>
              <RamOption
                ram={option}
                options={options}
                setOptions={setOptions}
              />
            </Grid>
          );
        });
      case "storage":
        return optionsArr.map((option, index) => {
          return (
            <Grid key={index} item xs={6}>
              <StorageOption
                storage={option}
                options={options}
                setOptions={setOptions}
              />
            </Grid>
          );
        });
      case "ssd":
        return optionsArr.map((option, index) => {
          return (
            <Grid key={index} item xs={6}>
              <SsdOption
                ssd={option}
                options={options}
                setOptions={setOptions}
              />
            </Grid>
          );
        });
      case "anc":
      case "wired":
        return (
          <Grid item xs={6}>
            <Box
              sx={{
                border: `1px solid ${optionsArr ? "#00a152" : "#ab003c"}`,
                borderRadius: "25px",
              }}
            >
              <Typography
                sx={{ py: "0.5rem" }}
                variant="body1"
                color={optionsArr ? "#00a152" : "#ab003c"}
                textAlign="center"
              >
                {optionsArr ? "Yes" : "No"}
              </Typography>
            </Box>
          </Grid>
        );

      default:
    }
  };

  return (
    <>
      <Divider sx={{ py: "1rem" }} />
      <Typography sx={{ py: "1rem" }} variant="h6">
        {getTitle()}
      </Typography>
      <Grid container spacing={1}>
        {getOptions()}
      </Grid>
    </>
  );
};

export default Option;
