import React from "react";
import { useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";
import OrderDeleteAdminModal from "./OrderDeleteAdminModal";

const ManageOrders = () => {
  const [openModal, setOpenModal] = useState(false);
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("orders", () =>
    fetch("https://intense-plateau-54634.herokuapp.com/booked", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((response) => response.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleApproval = (id) => {
    const url = `https://intense-plateau-54634.herokuapp.com/approval/${id}`;
    fetch(url, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
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
    fetch(`https://intense-plateau-54634.herokuapp.com/booked/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.deletedCount > 0) {
          setOpenModal(false);
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
                  <button onClick={() => setOpenModal(order)} class="">
                    <label
                      for="my-modal-3"
                      class="btn btn-sm btn-error modal-button"
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
          <OrderDeleteAdminModal
            openModal={openModal}
            handleDeleteOrder={handleDeleteOrder}
          ></OrderDeleteAdminModal>
        )}
      </div>
    </div>
  );
};

export default ManageOrders;
