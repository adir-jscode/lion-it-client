import React from "react";

const OrderDeleteAdminModal = ({ handleDeleteOrder, openModal }) => {
  return (
    <div>
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">Are you sure?</h3>
          <div class="modal-action">
            <button
              onClick={() => handleDeleteOrder(openModal._id)}
              class="btn btn-error flex justify-center mt-5"
            >
              DELETE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDeleteAdminModal;
