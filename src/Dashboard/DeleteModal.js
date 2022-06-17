import React from "react";
import { toast } from "react-toastify";

const DeleteModal = ({ modalDelete, handleDelete, loading, setLoading }) => {
  console.log(modalDelete._id);

  return (
    <div>
      <h1>Delete</h1>
      <input type="checkbox" id="my-modal-6" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h3 class="font-bold text-lg">Are you sure you want to delete?</h3>
          <div class="modal-action">
            <button
              onClick={() => handleDelete(modalDelete._id)}
              class="btn btn-error"
            >
              Delete
            </button>
            <label for="my-modal-6" class="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
