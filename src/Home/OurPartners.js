import React from "react";
import slack from "../assets/images/logos/slack.png";
import airbnb from "../assets/images/logos/airbnb.png";
import google from "../assets/images/logos/google.png";
import netflix from "../assets/images/logos/netflix.png";
import uber from "../assets/images/logos/uber.png";

const OurPartners = () => {
  return (
    <div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-24 mx-12 my-20">
        <img style={{ width: "140px", height: "46px" }} src={slack} alt="" />
        <img style={{ width: "140px", height: "46px" }} src={airbnb} alt="" />
        <img style={{ width: "140px", height: "46px" }} src={google} alt="" />
        <img style={{ width: "140px", height: "46px" }} src={netflix} alt="" />
        <img style={{ width: "140px", height: "46px" }} src={uber} alt="" />
      </div>
    </div>
  );
};

export default OurPartners;
