import React from "react";
import Header from "../Shared/Header";
import Banner from "./Banner";
import Newsletter from "./Newsletter";
import OurPartners from "./OurPartners";
import Review from "./Review";
import Services from "./Services";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OurPartners></OurPartners>
      <Services></Services>
      <Newsletter></Newsletter>
    </div>
  );
};

export default Home;
