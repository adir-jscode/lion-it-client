import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  // const [userData, setUserData] = useState([]);
  // const [reload, setReload] = useState(false);
  // useEffect(() => {
  //   fetch("http://localhost:5000/user", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data[0]._id);
  //       setUserData(data);
  //       console.log(userData);
  //     });
  // }, []);
  return (
    <div class="mx-12 my-10 shadow-xl p-4">
      <h1 class="text-accent font-bold my-5">Basic Information</h1>
      <div>
        <h1 class="font-bold my-5">
          Name:{" "}
          <input
            type="text"
            defaultValue={user.displayName}
            disabled
            placeholder="Type here"
            class="input input-bordered w-full max-w-lg"
          />
        </h1>
        <h1 class="font-bold my-5">
          Email:{" "}
          <input
            type="text"
            defaultValue={user?.email}
            disabled
            placeholder="Type here"
            class="input input-bordered w-full max-w-lg"
          />
        </h1>
        <h1 class="font-bold my-5">
          Phone:{" "}
          <input
            type="text"
            defaultValue="Add your phone number"
            disabled
            placeholder="Type here"
            class="input input-bordered w-full max-w-lg"
          />
        </h1>
      </div>
      {/* <button>
        <Link
          to={`edit-profile/${userData[0]?.email}`}
          className="btn btn-xs mr-36"
        >
          <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
          <span className="px-2">Edit Profile</span>
        </Link>
      </button> */}
    </div>
  );
};

export default Profile;
