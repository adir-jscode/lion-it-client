import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";

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
  const handleApproval = (id) => {
    const url = `http://localhost:5000/approval/${id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ approve: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        refetch();
      });
  };
  const handleDeleteOrder = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/booked/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Are you sure you want to delete?");
        if (data.modifiedCount > 0) {
          toast.success("Deleted");
          refetch();
        }
      });
  };
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
              <th>Payment Status</th>
              <th>Approval Status</th>
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
                {order.payment ? (
                  <td className="text-primary font-bold">Payment Received</td>
                ) : (
                  <td class="text-red-800 font-bold">Pending</td>
                )}

                {order.approval ? (
                  <td class="text-sky-600 font-bold">Approved</td>
                ) : (
                  <>
                    {order.payment ? (
                      <td>
                        <button
                          onClick={() => handleApproval(order._id)}
                          class="btn btn-sm btn-secondary"
                        >
                          Approve
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </>
                )}

                <td>
                  <button
                    onClick={() => handleDeleteOrder(order._id)}
                    class="btn btn-sm"
                  >
                    X
                  </button>
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
