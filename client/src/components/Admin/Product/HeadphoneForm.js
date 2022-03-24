import React from "react";

import { SliderPicker } from "react-color";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddIcon from "@mui/icons-material/Add";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";

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
