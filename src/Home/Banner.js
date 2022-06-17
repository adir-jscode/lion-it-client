import React from "react";

const Banner = () => {
  return (
    <div>
      <div class="hero min-h-screen bg-base-100">
        <div class="hero-content sm:max-w-10 flex-col lg:flex-row-reverse">
          <img
            src="https://aviola.netlify.app/img/core-img/banner.png"
            class="lg:max-w-lg rounded-lg bg-base-100"
          />
          <div>
            <small class="text-xl text-secondary font-bold">
              #Best Software Company
            </small>
            <h1 class="text-5xl text-black font-bold">
              Advanced Feature to Grow Your Business
            </h1>
            <p class="py-6">
              Proactively coordinate quality quality vectors vis-a-vis supply
              chains engage client-centric web services.
            </p>
            <button class="btn btn-outline text-white btn-secondary">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
