import React from "react";
import { useParams } from "react-router-dom";

const ServiceDetails = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Service id is {id}</h1>
    </div>
  );
};

export default ServiceDetails;
