import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "../Shared/Loading";

const EditProfile = () => {
  const { id } = useParams();
  const [user, loading, error] = useAuthState(auth);
  const {
    data: userInformation,
    isLoading,
    refetch,
  } = useQuery(["userInformation", id], () =>
    fetch(`http://localhost:5000/profile/${id}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((response) => response.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1>Edit id {id}</h1>
      <h1>{userInformation?.email}</h1>
      <h1>{userInformation?.displayName}</h1>
    </div>
  );
};

export default EditProfile;
