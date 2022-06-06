import React from "react";

const Newsletter = () => {
  return (
    <div>
      <div class="hero lg:h-96 md:max-h-full  bg-neutral rounded-lg">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="text-center lg:text-left">
            <img
              class=" w-full mx-auto"
              src="https://wordpressriverthemes.com/htmltemp/sland/assets/images/newsletter/newsletter-two.png"
              alt=""
            />
          </div>
          <div class="card flex-shrink-0 w-full max-w-lg">
            <div class="mb-20">
              <h1 class="text-white text-xl">Our Newsletter</h1>
              <h1 class="text-white text-2xl font-bold">
                Subscribe Our Newsletter to Get More Updates
              </h1>
            </div>
            <div class="card-body flex-row mb-20 shadow-2xl rounded-lg bg-base-100">
              <input
                type="text"
                placeholder="Type here your email address"
                class="input input-bordered input-accent w-full max-w-xs"
              />
              <input class="btn btn-accent" type="submit" value="Subscribe" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
