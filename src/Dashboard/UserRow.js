import React from "react";
import { toast } from "react-toastify";

const UserRow = ({ user, index, setReload, reload }) => {
  const makeAdmin = () => {
    fetch(`http://localhost:5000/user/admin/${user.email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (response.status === 403) {
          toast.error("Failed to make an admin");
        }
        return response.json();
      })
      .then((data) => {
        setReload(!reload);
        console.log(data);
        if (data.modifiedCount > 0) {
          toast.success(`${user.email} updated as admin`);
        }
      });
  };
  const removeAdmin = () => {
    fetch(`http://localhost:5000/user/customer/${user.email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => {
        if (response.status === 403) {
          toast.error("Failed to remove");
        }
        response.json();
      })
      .then((data) => {
        setReload(!reload);
        console.log(data);
        if (data?.modifiedCount === 1) {
          toast.success("Removed from admin");
        }
      });
  };
  return (
    <tr>
      <th>{index + 1}</th>
      <td>{user.email}</td>
      <td>
        {" "}
        {user.role === "admin" ? (
          <span class="text-green-700 font-bold">Admin</span>
        ) : (
          <button onClick={makeAdmin} class="btn btn-sm btn-warning">
            Make Admin
          </button>
        )}
      </td>
      <td>
        {user.role === "admin" && (
          <button onClick={removeAdmin} class="btn btn-circle btn-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  );
};

export default UserRow;
