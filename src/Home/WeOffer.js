import React from "react";
import "./WeOffer.css";

const WeOffer = () => {
  return (
    <div class="my-48">
      <h1 class="text-center mb-20 mt-5 font-bold text-4xl text-neutral">
        What We Offer
      </h1>
      <div class="flex flex-col lg:flex-row">
        <div class="hero-content">
          <div>
            <h1 class="text-5xl font-bold">Work productivity</h1>
            <p class="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
        </div>
        <div class="hero right">
          <div class="hero-overlay bg-opacity-60"></div>
          <div class="hero-content   text-white">
            <div class="max-w-md">
              <h1 class="mb-5 text-4xl font-bold">Every detail matters</h1>
              <p class="mb-5">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
              <button class="btn btn-primary">Learn More</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeOffer;
