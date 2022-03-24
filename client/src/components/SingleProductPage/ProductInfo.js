import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import { useProductContext } from "../../context/ProductContext";
import { useCartContext } from "../../context/CartContext";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import ReadMoreReact from "read-more-react";

// Components
import Options from "./Options";
import Loading from "../Loading";

// UI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

// ICONS
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";

const ProductInfo = () => {
  const { showMessage } = useAppContext();
  const { singleProduct, isProductLoading } = useProductContext();
  const { addToCart, isCartLoading } = useCartContext();
  const [options, setOptions] = useState({});
  const history = useHistory();

  useEffect(() => {
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const submit = async () => {
    let isSuccess = await addToCart(
      singleProduct._id,
      options,
      1,
      singleProduct.price
    );
    if (isSuccess) {
      showMessage("Product added!", "success");
      history.push("/cart");
    } else {
      showMessage("Failed to add product", "error");
    }
  };

  const init = () => {
    let initOptions = {};
    for (const property in singleProduct) {
      if (property === "color") {
        initOptions.color = singleProduct[property][0];
      } else if (property === "ram") {
        initOptions.ram = singleProduct[property][0];
      } else if (property === "storage") {
        initOptions.storage = singleProduct[property][0];
      } else if (property === "ssd") {
        initOptions.ssd = singleProduct[property][0];
      }
    }
    setOptions(initOptions);
  };

  const _buildOption = () => {
    let list = [];
    let i = 0;
    for (const property in singleProduct) {
      if (
        property === "color" ||
        property === "ram" ||
        property === "storage" ||
        property === "ssd" ||
        property === "anc" ||
        property === "wired"
      ) {
        list = [
          ...list,
          <Options
            key={i}
            property={property}
            optionsArr={singleProduct[property]}
            options={options}
            setOptions={setOptions}
          />,
        ];
      }
      i++;
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
      <Typography>{qty > 0 ? "In Stock" : "Out of Stock"}</Typography>
      <Box>{}</Box>
      <Box>{_buildOption()}</Box>

      <Box sx={{ my: "2rem" }}>
        <Button
          variant="contained"
          startIcon={<AddShoppingCartIcon />}
          disabled={qty === 0 || isCartLoading}
          sx={{ width: "100%", py: "1" }}
          onClick={(e) => {
            submit();
          }}
        >
          ADD TO CART
        </Button>
      </Box>
    </Box>
  );
};

export default ProductInfo;
