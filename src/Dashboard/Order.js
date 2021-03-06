import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import Loading from "../Shared/Loading";
import OrderDeleteModal from "./OrderDeleteModal";

const Order = () => {
  const [user, loading, error] = useAuthState(auth);
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const {
    data: order,
    isLoading,
    refetch,
  } = useQuery(["order", user.email], () =>
    fetch(`https://intense-plateau-54634.herokuapp.com/booked/${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((response) => response.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleRemoveOrder = (id) => {
    console.log("remove order", id);
    fetch(`https://intense-plateau-54634.herokuapp.com/purchase/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          toast.success("Order removed");
          setOpenModal(false);
          refetch();
        }
      });
  };
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
              <th>Remove</th>
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
                    <button class="btn btn-accent btn-xs">
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
                <td>
                  <button onClick={() => setOpenModal(order)}>
                    <label
                      for="my-modal-3"
                      class="btn modal-button btn-sm btn-error btn-sm btn-error"
                    >
                      X
                    </label>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {openModal && (
          <OrderDeleteModal
            handleRemoveOrder={handleRemoveOrder}
            openModal={openModal}
          ></OrderDeleteModal>
        )}
      </div>
    </div>
  );
};

export default Order;
