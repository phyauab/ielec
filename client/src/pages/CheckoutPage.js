import React, { useState, useEffect } from "react";
import { useCartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import api from "../context/Api";

// components
import CheckoutForm from "../components/CheckoutForm";
import BreadCrumb from "../components/BreadCrumb";

// UI
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

const stripePromise = loadStripe(
  "pk_test_51KeZZgEjNPWRZVN6NxvvgoqpajqSrNC7rS0SHdh6ctV2SU0Vt8Dtrtk53k05ykqVn7X56IK37GY0cUz1et2kmiIq00MzCExRn8"
);

const breadcrumbs = [
  <Link underline="hover" key="1" color="inherit" to="/">
    Home
  </Link>,
  <Typography key="3" color="text.primary">
    Checkout
  </Typography>,
];

const CheckoutPage = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems } = useCartContext();

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  const load = async () => {
    console.log("submit");
    // calculate amount
    let amount = 0;
    for (const cartItem of cartItems) {
      let additionalPrice = 0;
      for (const option of cartItem.options) {
        additionalPrice += option.additionalPrice;
      }

      amount += (cartItem.product.price + additionalPrice) * cartItem.qty;
    }
    // get stripe session
    try {
      const response = await api.post("/transactions/create-payment-intent", {
        amount: amount,
      });
      setClientSecret(response.data.clientSecret);
    } catch (e) {}
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignContent: "center",
        flex: 1,
      }}
    >
      <BreadCrumb breadcrumbs={breadcrumbs} />

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </Container>
  );
};

export default CheckoutPage;
