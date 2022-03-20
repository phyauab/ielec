import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";

// Components
import Loading from "./Loading";

// UI
// import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
// import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import FilterListIcon from "@mui/icons-material/FilterList";

const ProductFilter = () => {
  const [filter, setFilter] = useState({
    rating: [0, 5],
    price: [0, 20000],
    brand: "",
  });
  const { fetchBrands, brands, isFilterLoading, fetchProductsWithFilter } =
    useProductContext();

  useEffect(() => {
    fetchBrands();
    // setFilter({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ratingMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 1,
      label: "1",
    },
    {
      value: 2,
      label: "2",
    },
    {
      value: 3,
      label: "3",
    },
    {
      value: 4,
      label: "4",
    },
    {
      value: 5,
      label: "5",
    },
  ];

  const priceMarks = [
    {
      value: 0,
      label: "0",
    },
    {
      value: 5000,
      label: "5000",
    },
    {
      value: 10000,
      label: "10000",
    },
    {
      value: 15000,
      label: "15000",
    },
    {
      value: 20000,
      label: "20000",
    },
  ];

  // console.log(brands);
  return (
    <Grid container spacing={4}>
      {/* Name */}
      <Grid item xs={12}>
        <TextField
          id="standard-basic"
          label="Name"
          variant="standard"
          onChange={(e) => setFilter({ ...filter, name: e.target.value })}
        />
      </Grid>
      {/* Brands */}
      <Grid item xs={6}>
        <FormControl fullWidth variant="standard">
          <InputLabel id="test-select-label">Brand</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="Age"
            value={filter.brand}
            defaultValue={""}
            onChange={(e) => setFilter({ ...filter, brand: e.target.value })}
          >
            <MenuItem key={0} value={""}>
              All
            </MenuItem>

            {brands.map((brand, index) => (
              <MenuItem key={index} value={brand._id}>
                {brand.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* rating */}
      <Grid item xs={12}>
        <Grid item xs={6}>
          <Typography id="input-slider" gutterBottom>
            Rating
          </Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={filter.rating}
            min={0}
            max={5}
            marks={ratingMarks}
            onChange={(e, newValue) =>
              setFilter({ ...filter, rating: newValue })
            }
          />
        </Grid>
      </Grid>
      {/* price */}
      <Grid item xs={12}>
        <Grid item xs={6}>
          <Typography id="input-slider" gutterBottom>
            Price
          </Typography>
          <Slider
            getAriaLabel={() => "Temperature range"}
            value={filter.price}
            min={0}
            max={20000}
            marks={priceMarks}
            valueLabelDisplay="auto"
            onChange={(e, newValue) =>
              setFilter({ ...filter, price: newValue })
            }
          />
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Typography id="input-slider" gutterBottom>
          Featured
        </Typography>
        <RadioGroup
          row
          defaultValue="all"
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          onChange={(e) => setFilter({ ...filter, featured: e.target.value })}
        >
          <FormControlLabel value="all" control={<Radio />} label="All" />
          <FormControlLabel value="yes" control={<Radio />} label="Yes" />
          <FormControlLabel value="no" control={<Radio />} label="No" />
        </RadioGroup>
      </Grid>
      <Grid item xs={6}>
        <Button
          startIcon={<FilterListIcon />}
          variant="contained"
          sx={{ width: "100%" }}
          // onClick={fetchProductsWithFilter(filter)}
          onClick={(e) => {
            fetchProductsWithFilter(filter);
          }}
        >
          Filter
        </Button>
      </Grid>
    </Grid>
  );
};

export default ProductFilter;
