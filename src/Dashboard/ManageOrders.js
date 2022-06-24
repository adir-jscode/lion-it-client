import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";

const ManageOrders = () => {
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch("http://localhost:5000/booked").then((response) => response.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 class="font-bold my-5">Total Orders {orders.length}</h1>

      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Price</th>
              <th>Cancel</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{order.serviceName}</td>
                <td>{order.email}</td>
                <td>{order.phone}</td>
                <td>{order.price}</td>
                <td>
                  <button class="btn btn-sm">X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageOrders;
