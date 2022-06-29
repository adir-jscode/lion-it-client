import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import UserRow from "./UserRow";

const User = () => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    fetch("https://intense-plateau-54634.herokuapp.com/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
  }, [reload]);
  return (
    <div>
      {/* <h1 class="text-xl font-bold">Number of Users : {users?.length}</h1> */}
      <div class="overflow-x-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Admin</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <UserRow
                reload={reload}
                setReload={setReload}
                index={index}
                key={user._id}
                user={user}
              ></UserRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default User;
