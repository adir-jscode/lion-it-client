import React, { useState } from "react";
import { useEffect } from "react";
import UpdateService from "./UpdateService";

const ManageService = () => {
  const [manageService, setManageService] = useState([]);
  const [update, setUpdate] = useState(false);
  useEffect(() => {
    fetch("http://localhost:5000/service").then((response) =>
      response.json().then((data) => setManageService(data))
    );
  }, []);
  return (
    <div>
      <h1>Total service : {manageService.length}</h1>
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
                  <label
                    for="my-modal"
                    onClick={() => setUpdate(manage)}
                    class="btn modal-button btn-primary"
                  >
                    Update
                  </label>
                </td>
                <td>
                  <button class="btn btn-error">X</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {update && (
          <UpdateService manageService={manageService}></UpdateService>
        )}
      </div>
    </div>
  );
};

export default ManageService;
