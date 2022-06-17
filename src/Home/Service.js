import React from "react";
import { Link } from "react-router-dom";

const Service = ({ service }) => {
  return (
    <div>
      <div class="card card-compact w-96 bg-base-100 shadow-xl">
        <figure>
          <img style={{ height: "166px" }} src={service.image} alt="Shoes" />
        </figure>
        <div class="card-body">
          <h2 class="card-title">{service.name}</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-end">
            <button class="btn btn-primary">
              <Link to={`/book/${service._id}`}>Buy Now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Service;
