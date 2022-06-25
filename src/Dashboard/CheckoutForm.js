import React from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { useEffect } from "react";
const CheckoutForm = ({ price, payment }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [success, setSuccess] = useState("");
  const [transitionId, setTransitionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (elements == null) {
      return;
    }

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setCardError(error?.message || "");

    const { paymentIntent, error: paymentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: payment.name,
            email: payment.email,
          },
        },
      });
    if (paymentError) {
      setPaymentError(paymentError?.message);
    } else {
      console.log(paymentIntent);
      setSuccess("Payment is successful");
      setTransitionId(paymentIntent.id);
      const paymentInfo = {
        serviceId: payment._id,
        serviceName: payment.serviceName,
        transactionId: paymentIntent.id,
      };
      const url = `http://localhost:5000/booked/${payment._id}`;
      fetch(url, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    }
  };

  return (
    <div class="my-5">
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button
          class="my-5 btn btn-primary btn-sm"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {paymentError && (
        <span className="text-red-800 font-bold">{paymentError}</span>
      )}
      {cardError && <span className="text-red-800 font-bold">{cardError}</span>}
      {success && <span className="text-red-800 font-bold">{success}</span>}
      <br />
      {transitionId && (
        <span className="text-green-800 font-bold">
          Your transition ID: {transitionId}
        </span>
      )}
    </div>
  );
};

export default CheckoutForm;
