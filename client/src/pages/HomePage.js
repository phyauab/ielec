import React from "react";
import Hero from "../components/Hero";
import Offer from "../components/Offer";
import FeaturedProducts from "../components/FeaturedProducts";
import NewsLetter from "../components/NewsLetter";

const HomePage = () => {
  return (
    <section>
      <Hero />
      <Offer />
      <FeaturedProducts />
      <NewsLetter />
    </section>
  );
};

export default HomePage;
