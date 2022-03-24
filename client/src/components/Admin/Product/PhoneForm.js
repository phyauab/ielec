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

const PhoneForm = ({ product, setProduct }) => {
  return (
    <Grid container item xs={12} rowSpacing={2}>
      {/* Color */}
      <Grid item xs={12}>
        <FormLabel>Color (Optional)</FormLabel>
      </Grid>

      {product.color.map((item, index) => {
        return (
          <Grid key={index} container item xs={12} rowSpacing={2}>
            <Grid container item xs={12} columnSpacing={2}>
              <Grid item xs={5}>
                <TextField
                  label={`Color ${index + 1} name`}
                  value={item.name}
                  required
                  onChange={(e) => {
                    let tempColor = product.color;
                    tempColor[index].name = e.target.value;
                    setProduct({ ...product, color: tempColor });
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <TextField
                  label={`Color ${index + 1} price`}
                  value={item.additionalPrice}
                  required
                  type="number"
                  onChange={(e) => {
                    let tempColor = product.color;
                    tempColor[index].additionalPrice = e.target.value;
                    setProduct({ ...product, color: tempColor });
                  }}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton
                  onClick={(e) => {
                    let tempColor = product.color;
                    tempColor.splice(index, 1);
                    setProduct({ ...product, color: tempColor });
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <SliderPicker
                color={item.colorCode}
                onChangeComplete={(c) => {
                  let tempColor = product.color;
                  tempColor[index].colorCode = c.hex;
                  setProduct({ ...product, color: tempColor });
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        );
      })}

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={(e) => {
            let tempColors = product.color;
            tempColors.push({
              name: "",
              colorCode: "#000000",
            });
            setProduct({
              ...product,
              color: tempColors,
            });
          }}
        >
          add color
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {/* RAM */}
      <Grid item xs={12}>
        <FormLabel>Ram (Optional)</FormLabel>
      </Grid>

      {product.ram.map((item, index) => {
        return (
          <Grid container item xs={12} rowSpacing={2}>
            <Grid container item xs={12} columnSpacing={2}>
              <Grid item xs={4}>
                <TextField
                  label={`Ram ${index + 1} size`}
                  value={item.size}
                  type="number"
                  required
                  onChange={(e) => {
                    let tempRam = product.ram;
                    tempRam[index].size = e.target.value;
                    setProduct({ ...product, ram: tempRam });
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.unit}
                    label="unit"
                    onChange={(e) => {
                      let tempRam = product.ram;
                      tempRam[index].unit = e.target.value;
                      setProduct({ ...product, ram: tempRam });
                    }}
                  >
                    <MenuItem value={"MB"}>MB</MenuItem>
                    <MenuItem value={"GB"}>GB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Additional Price"
                  value={item.additionalPrice}
                  type="number"
                  required
                  onChange={(e) => {
                    let tempRam = product.ram;
                    tempRam[index].additionalPrice = e.target.value;
                    setProduct({ ...product, ram: tempRam });
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <IconButton>
                  <ClearIcon
                    onClick={(e) => {
                      let tempRam = product.ram;
                      tempRam.splice(index, 1);
                      setProduct({ ...product, ram: tempRam });
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        );
      })}

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={(e) => {
            let tempRam = product.ram;
            tempRam.push({
              size: "",
              unit: "MB",
              additionalPrice: 0,
            });
            setProduct({
              ...product,
              ram: tempRam,
            });
          }}
        >
          add Ram
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>

      {/* Storage */}
      <Grid item xs={12}>
        <FormLabel>Storage (Optional)</FormLabel>
      </Grid>

      {product.storage.map((item, index) => {
        return (
          <Grid container item xs={12} rowSpacing={2}>
            <Grid container item xs={12} columnSpacing={2}>
              <Grid item xs={4}>
                <TextField
                  label={`Storage ${index + 1} size`}
                  value={item.size}
                  type="number"
                  required
                  onChange={(e) => {
                    let tempStorage = product.storage;
                    tempStorage[index].size = e.target.value;
                    setProduct({ ...product, storage: tempStorage });
                  }}
                />
              </Grid>

              <Grid item xs={3}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Unit</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item.unit}
                    label="unit"
                    required
                    onChange={(e) => {
                      let tempStorage = product.storage;
                      tempStorage[index].unit = e.target.value;
                      setProduct({ ...product, storage: tempStorage });
                    }}
                  >
                    <MenuItem value={"GB"}>GB</MenuItem>
                    <MenuItem value={"TB"}>TB</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={3}>
                <TextField
                  label="Additional Price"
                  value={item.additionalPrice}
                  type="number"
                  required
                  onChange={(e) => {
                    let tempStorage = product.storage;
                    tempStorage[index].additionalPrice = e.target.value;
                    setProduct({ ...product, storage: tempStorage });
                  }}
                />
              </Grid>

              <Grid item xs={2}>
                <IconButton>
                  <ClearIcon
                    onClick={(e) => {
                      let tempStorage = product.storage;
                      tempStorage.splice(index, 1);
                      setProduct({ ...product, storage: tempStorage });
                    }}
                  />
                </IconButton>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>
          </Grid>
        );
      })}

      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          onClick={(e) => {
            let tempStorage = product.storage;
            tempStorage.push({
              size: "",
              unit: "MB",
              additionalPrice: 0,
            });
            setProduct({
              ...product,
              storage: tempStorage,
            });
          }}
        >
          add Storage
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default PhoneForm;
