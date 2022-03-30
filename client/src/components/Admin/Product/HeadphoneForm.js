import React from "react";

// UI
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Divider from "@mui/material/Divider";

const HeadphoneForm = ({ product, setProduct }) => {
  return (
    <Grid container item xs={12} rowSpacing={2}>
      {/* ANC */}
      <Grid item xs={12}>
        <FormControl sx={{ display: "flex" }}>
          <FormLabel>Active Noise Cancellation</FormLabel>
          <RadioGroup
            row
            aria-labelledby="anc"
            name="row-radio-buttons-group"
            value={product.anc}
            defaultValue={false}
            onChange={(e) => setProduct({ ...product, anc: e.target.value })}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* WIRED */}
      <Grid item xs={12}>
        <FormControl sx={{ display: "flex" }}>
          <FormLabel>Wired</FormLabel>
          <RadioGroup
            row
            aria-labelledby="wired"
            name="row-radio-buttons-group"
            value={product.wired}
            defaultValue={false}
            onChange={(e) => setProduct({ ...product, wired: e.target.value })}
          >
            <FormControlLabel value={true} control={<Radio />} label="Yes" />
            <FormControlLabel value={false} control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default HeadphoneForm;
