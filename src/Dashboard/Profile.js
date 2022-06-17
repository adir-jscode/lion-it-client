import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const Profile = () => {
  const [user, loading, error] = useAuthState(auth);
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
    </div>
  );
};

export default Profile;
