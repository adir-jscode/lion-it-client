import React, { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteModal from "./DeleteModal";
import UpdateService from "./UpdateService";

const ManageService = () => {
  const [manageService, setManageService] = useState([]);
  const [update, setUpdate] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/service", {
      method: "GET",
      headers: {
        authorization: `Bearer${localStorage.getItem("accessToken")}`,
      },
    }).then((response) =>
      response.json().then((data) => setManageService(data))
    );
  }, [loading]);

  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:5000/service/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.deletedCount > 0) {
          toast.success("Deleted Successfully");
          setModalDelete(false);
          setLoading(!loading);
        }
      });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold my-5">
        {" "}
        Our Total service : {manageService.length}
      </h1>
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th>NO</th>
              <th>Thumbnail</th>
              <th>Name</th>
              <th>Price</th>
              <th>Update</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {manageService.map((manage, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>
                  <div class="avatar">
                    <div class="w-8 rounded">
                      <img
                        src={manage.image}
                        alt="Tailwind-CSS-Avatar-component"
                      />
                    </div>
                  </div>
                </td>
                <td>{manage.name}</td>
                <td>{manage.price}</td>
                <td>
                  <Link
                    class="btn modal-button btn-primary"
                    to={`/update-service/${manage._id}`}
                  >
                    Update
                  </Link>

                  {/* {update && (
                    <UpdateService
                      loading={loading}
                      setLoading={setLoading}
                      update={update}
                      setUpdate={setUpdate}
                    ></UpdateService>
                  )} */}
                </td>
                <td>
                  <label
                    onClick={() => setModalDelete(manage)}
                    for="my-modal-6"
                    class="btn modal-button btn-error"
                  >
                    X
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {update && (
          <UpdateService
            loading={loading}
            setLoading={setLoading}
            update={update}
            setUpdate={setUpdate}
          ></UpdateService>
        )}

        {modalDelete && (
          <DeleteModal
            modalDelete={modalDelete}
            handleDelete={handleDelete}
            setLoading={setLoading}
            loading={loading}
          ></DeleteModal>
        )}
      </div>
    </div>
  );
};

export default ManageService;
