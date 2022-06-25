import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
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
              <th>Transaction ID</th>
              <th>Booking Status</th>
            </tr>
          </thead>
          <tbody>
            {order.map((order, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{order.serviceName}</td>
                <td>{order.price}</td>
                {!order.payment ? (
                  <td>
                    <button class="btn btn-error btn-xs">
                      <Link to={`/dashboard/payment/${order._id}`}>Pay</Link>
                    </button>
                  </td>
                ) : (
                  <td class="text-sm text-green-500 font-bold mt-2">
                    Successful
                  </td>
                )}
                <td class="text-accent font-bold">{order.transactionId}</td>
                {order.approval ? (
                  <td class="text-cyan-800 font-bold">Accepted</td>
                ) : (
                  <td class="text-orange-800 font-bold">Pending</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Order;
