import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import auth from "../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useEffect } from "react";
import UpdateProfileModal from "./UpdateProfileModal";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/info?email=${user.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setInfo(data));
  }, [reload]);
  // const {
  //   data: info,
  //   isLoading,
  //   refetch,
  // } = useQuery(["info", user.email], () =>
  //   fetch(`http://localhost:5000/info?email=${user.email}`, {
  //     method: "GET",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  // );
  // if (isLoading) {
  //   return <Loading></Loading>;
  // }
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
            defaultValue={info?.phone}
            disabled
            placeholder="Type here"
            class="input input-bordered w-full max-w-lg"
          />
        </h1>
        <h1 class="font-bold my-5">
          Location:{" "}
          <input
            type="text"
            defaultValue={info?.location}
            disabled
            class="input input-bordered w-full max-w-lg"
          />
        </h1>
      </div>
      <div class="w-5/6 flex justify-center">
        <button onClick={() => setModal(user)}>
          <label for="my-modal-3" class="btn btn-sm">
            Edit Profile
          </label>
        </button>
      </div>
      {modal && (
        <UpdateProfileModal
          setModal={setModal}
          modal={modal}
          setReload={setReload}
          reload={reload}
          info={info}
        ></UpdateProfileModal>
      )}
    </div>
  );
};

export default Profile;
