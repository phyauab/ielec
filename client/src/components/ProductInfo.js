import React, { useState, useEffect } from "react";
import { useProductContext } from "../context/ProductContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import ReadMoreReact from "read-more-react";

import ColorOption from "./Options/ColorOption";
import RamOption from "./Options/RamOption";
import SsdOption from "./Options/SsdOption";
import StorageOption from "./Options/StorageOption";
import Loading from "./Loading";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Modal from "./Modal";

// ICONS
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductInfo = () => {
  const { singleProduct, isProductLoading } = useProductContext();
  const [options, setOptions] = useState({});

  useEffect(() => {
    init();
  }, []);

  if (isProductLoading) {
    return <Loading />;
  }

  const { name, brand, rating, price, description, qty } = singleProduct;

  const buildRating = () => {
    const list = [];
    for (let i = 0, count = rating; i < 5; ++i, count--) {
      if (count > 0) {
        list.push(<AiFillStar key={i} />);
      } else {
        list.push(<AiOutlineStar key={i} />);
      }
    }
    return <>{list}</>;
  };

  const init = () => {
    let initOptions = {};
    for (const property in singleProduct) {
      if (property == "color") {
        initOptions.color = singleProduct[property][0]._id;
      } else if (property == "ram") {
        initOptions.ram = singleProduct[property][0]._id;
      } else if (property == "storage") {
        initOptions.storage = singleProduct[property][0]._id;
      } else if (property == "ssd") {
        initOptions.ssd = singleProduct[property][0]._id;
      }
    }
    setOptions(initOptions);
  };

  const _buildOption = () => {
    let list = [];
    let colorList = [];
    let ramList = [];
    let ssdList = [];
    let storageList = [];
    for (const property in singleProduct) {
      if (property == "color") {
        for (let i = 0; i < singleProduct[property].length; ++i) {
          colorList.push(
            <Grid key={`colorGrid${i}`} item xs={6}>
              <ColorOption
                key={i}
                color={singleProduct[property][i]}
                options={options}
                setOptions={setOptions}
              />
            </Grid>
          );
        }
        list = [
          ...list,
          <>
            <Divider sx={{ py: "1rem" }} />
            <Typography sx={{ py: "1rem" }} variant="h6">
              Pick a color
            </Typography>
            <Grid container spacing={1}>
              {colorList}
            </Grid>
          </>,
        ];
      } else if (property == "ram") {
        for (let i = 0; i < singleProduct[property].length; ++i) {
          ramList.push(
            <Grid key={i} item xs={6}>
              <RamOption
                ram={singleProduct[property][i]}
                options={options}
                setOptions={setOptions}
              />
            </Grid>
          );
        }
        list = [
          ...list,
          <>
            <Divider sx={{ py: "1rem" }} />
            <Typography sx={{ py: "1rem" }} variant="h6">
              Pick a ram size
            </Typography>
            <Grid container spacing={1}>
              {ramList}
            </Grid>
          </>,
        ];
      } else if (property == "storage") {
        for (let i = 0; i < singleProduct[property].length; ++i) {
          storageList.push(
            <Grid key={i} item xs={6}>
              <StorageOption
                storage={singleProduct[property][i]}
                options={options}
                setOptions={setOptions}
              />
            </Grid>
          );
        }
        list = [
          ...list,
          <>
            <Divider sx={{ py: "1rem" }} />
            <Typography sx={{ py: "1rem" }} variant="h6">
              Pick a storage size
            </Typography>
            <Grid container spacing={1}>
              {storageList}
            </Grid>
          </>,
        ];
      } else if (property == "ssd") {
        for (let i = 0; i < singleProduct[property].length; ++i) {
          ssdList.push(
            <Grid key={i} item xs={6}>
              <SsdOption
                ssd={singleProduct[property][i]}
                options={options}
                setOptions={setOptions}
              />
            </Grid>
          );
        }
        list = [
          ...list,
          <>
            <Divider sx={{ py: "1rem" }} />
            <Typography sx={{ py: "1rem" }} variant="h6">
              Pick a SSD size
            </Typography>
            <Grid container spacing={1}>
              {ssdList}
            </Grid>
          </>,
        ];
      } else if (property == "anc") {
        list = [
          ...list,
          <>
            <Divider sx={{ py: "1rem" }} />
            <Typography sx={{ py: "1rem" }} variant="h6">
              ANC: {singleProduct[property] ? "Yes" : "No"}
            </Typography>
          </>,
        ];
      } else if (property == "wired") {
        list = [
          ...list,
          <>
            <Divider sx={{ py: "1rem" }} />
            <Typography sx={{ py: "1rem" }} variant="h6">
              Wired: {singleProduct[property] ? "Yes" : "No"}
            </Typography>
          </>,
        ];
      }
    }

    return list;
  };

  return (
    <Box sx={{}}>
      <Typography sx={{ textTransform: "capitalize" }} variant="caption">
        {brand.name}
      </Typography>
      <Typography variant="h2">{name}</Typography>
      <Box sx={{ py: "1rem" }}>
        <Typography variant="h5" sx={{ color: "text.secondary" }}>
          ${price}
        </Typography>
      </Box>
      <Box sx={{ py: "1rem" }}>{buildRating()}</Box>
      <Box>
        <ReadMoreReact
          text={description}
          min={200}
          ideal={250}
          max={300}
          readMoreText="...more"
        />
      </Box>
      <Box>{_buildOption()}</Box>

      <Box sx={{ my: "2rem" }}>
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          sx={{ width: "100%", py: "1" }}
        >
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfo;
