import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import Service from "./Service";
const Services = () => {
  const {
    data: services,
    isLoading,
    refetch,
  } = useQuery("services", () =>
    fetch("https://intense-plateau-54634.herokuapp.com/service", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div class="my-10">
      <h1 className="text-5xl text-primary font-bold text-center my-5">
        Our Service
      </h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mx-12">
        {services.map((service) => (
          <Service key={service._id} service={service}></Service>
        ))}
      </div>
    </div>
  );
};

export default Services;
