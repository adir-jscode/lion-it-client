import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import auth from "../firebase.init";
import Loading from "../Shared/Loading";

const Order = () => {
  const [user, loading, error] = useAuthState(auth);
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery(["order", user.email], () =>
    fetch(`http://localhost:5000/booked/${user.email}`).then((response) =>
      response.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 class="font-bold my-5">My orders: {order.length}</h1>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Payment</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{order.serviceName}</td>
                <td>{order.price}</td>
                <td>
                  <button class="btn btn-error btn-xs">Pay</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
