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

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

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
    // calculate amount
    let amount = 0;
    for (const cartItem of cartItems) {
      amount += cartItem.price * cartItem.qty;
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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
