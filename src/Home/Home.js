import React from "react";
import Header from "../Shared/Header";
import Banner from "./Banner";
import Newsletter from "./Newsletter";
import OurPartners from "./OurPartners";
import Review from "./Review";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OurPartners></OurPartners>
      <Newsletter></Newsletter>
      <Review></Review>
    </div>
  );
};

export default Home;
