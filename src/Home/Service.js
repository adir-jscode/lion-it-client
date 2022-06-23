import React from "react";
import { Link } from "react-router-dom";

const Service = ({ service }) => {
  return (
    <div>
      <div class="card card-compact h-96 w-96 bg-base-100 shadow-xl">
        <figure>
          <img style={{ height: "166px" }} src={service.image} alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{service.name}</h2>
          <p>{service.description}</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">
              <Link to={`/service/${service._id}`}>Buy Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
