import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51L2HLGKsBsoEqRmE2AcZlZOr32JIWO1judrGQsDmDGct0KanbQnZkT1r1XB9WPEmlWBFklsOJprRN9YZkv448VTC00WwjihIEB"
);
const Payment = () => {
  const { id } = useParams();
  const url = `http://localhost:5000/payment/${id}`;

  const {
    data: payment,
    isLoading,
    refetch,
  } = useQuery(["payment", id], () =>
    fetch(url).then((response) => response.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="">
      <div class="card w-96 mx-auto my-40 bg-base-100 shadow-xl">
        <div class="card-body">
          <h2 class="card-title">
            Hi There,{" "}
            <span class="text-purple-500 font-bold">{payment.name}</span>
          </h2>
          <p>
            You Booked for <span class="font-bold">{payment.serviceName}</span>
          </p>
          <p>
            Please pay:{" "}
            <span class="text-amber-600 font-bold">${payment.price}</span>
          </p>
          <div class="">
            <Elements stripe={stripePromise}>
              <CheckoutForm payment={payment} price={payment.price} />
            </Elements>
          </div>
        </div>
      </div>
      {/* <div class="card w-96 h-32 mx-auto my-40 bg-base-100 shadow-xl">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={payment.price} />
        </Elements>
      </div> */}
    </div>
  );
};

export default Payment;
