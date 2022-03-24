import React from "react";

// components
import PhoneForm from "./PhoneForm";
import LaptopForm from "./LaptopForm";
import HeadphoneForm from "./HeadphoneForm";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
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

const ProductForm = ({ product, setProduct, brands }) => {
  return (
    <>
      {/* Category */}
      <Grid item xs={12}>
        <FormControl sx={{ display: "flex" }}>
          <FormLabel>Category</FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender row"
            name="row-radio-buttons-group"
            value={product.category}
            defaultValue="Phone"
            onChange={(e) => {
              let tempProduct = product;

              // delete all options
              delete tempProduct.color;
              delete tempProduct.ram;
              delete tempProduct.storage;
              delete tempProduct.cpu;
              delete tempProduct.ssd;
              delete tempProduct.anc;
              delete tempProduct.wired;
              if (e.target.value === "Phone") {
                tempProduct.color = [];
                tempProduct.ram = [];
                tempProduct.storage = [];
              } else if (e.target.value === "Laptop") {
                tempProduct.cpu = "";
                tempProduct.color = [];
                tempProduct.ram = [];
                tempProduct.ssd = [];
              } else if (e.target.value === "Headphone") {
                tempProduct.anc = false;
                tempProduct.wired = false;
              }
              tempProduct.category = e.target.value;
              console.log("-----------");
              console.log(tempProduct);
              setProduct({ ...tempProduct });
            }}
          >
            <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
            <FormControlLabel
              value="Laptop"
              control={<Radio />}
              label="Laptop"
            />
            <FormControlLabel
              value="Headphone"
              control={<Radio />}
              label="Headphone"
            />
            <FormControlLabel
              value="Accessories"
              control={<Radio />}
              label="Accessories"
            />
          </RadioGroup>
        </FormControl>
      </Grid>

      {/* Name */}
      <Grid item xs={12}>
        <TextField
          variant="outlined"
          label="Name"
          type="text"
          required
          fullWidth
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </Grid>

      {/* Brand  */}
      <Grid item xs={12}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Brand *</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={product.brand}
            label="brand"
            required
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          >
            {brands.map((brand, index) => {
              return (
                <MenuItem key={index} value={brand._id}>
                  {brand.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>

      <Grid container item xs={12} columnSpacing={2}>
        {/* Price */}
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Price"
            type="number"
            required
            fullWidth
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Grid>
        {/* Rating */}
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Rating"
            type="number"
            required
            fullWidth
            value={product.rating}
            onChange={(e) => {
              if (e.target.value < 0 || e.target.value > 5) return;
              setProduct({ ...product, rating: e.target.value });
            }}
          />
        </Grid>
      </Grid>

      <Grid container item xs={12} columnSpacing={2}>
        {/* qty */}
        <Grid item xs={6}>
          <TextField
            variant="outlined"
            label="Quantity"
            type="number"
            required
            fullWidth
            value={product.qty}
            onChange={(e) => {
              if (e.target.value < 0) return;
              setProduct({ ...product, qty: e.target.value });
            }}
          />
        </Grid>
        {/* Featured */}
        <Grid item xs={6}>
          <FormControl sx={{ display: "flex" }}>
            <FormLabel>Featured</FormLabel>
            <RadioGroup
              row
              aria-labelledby="isFeatured"
              name="row-radio-buttons-group"
              value={product.isFeatured}
              defaultValue={false}
              onChange={(e) =>
                setProduct({ ...product, isFeatured: e.target.value })
              }
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>

      {/* Description */}
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Description"
          placeholder="(Optional)"
          multiline
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
          rows={4}
          maxRows={10}
        />
      </Grid>

      {/* Profile Image */}
      <Grid item xs={12}>
        <FormLabel>Profile Image </FormLabel>
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            id="contained-button-file"
            type="file"
            required
            // style={{ display: "none" }}
            onChange={(e) =>
              setProduct({ ...product, profilePath: e.target.files[0] })
            }
          />
        </label>
      </Grid>

      {/* Images */}
      <Grid item xs={12}>
        <FormLabel>Additional Images </FormLabel>
        <label htmlFor="contained-button-file">
          <input
            accept="image/*"
            type="file"
            multiple
            // value={product.imagePaths}
            onChange={(e) =>
              setProduct({ ...product, imagePaths: e.target.files })
            }
          />
        </label>
      </Grid>

      <Grid item xs={12}>
        <Divider />
      </Grid>

      {/* Phone */}
      {product.category === "Phone" && (
        <PhoneForm product={product} setProduct={setProduct} />
      )}

      {/* Laptop */}
      {product.category === "Laptop" && (
        <LaptopForm product={product} setProduct={setProduct} />
      )}

      {/* Headphone */}
      {product.category === "Headphone" && (
        <HeadphoneForm product={product} setProduct={setProduct} />
      )}
    </>
  );
};

export default ProductForm;
