import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/images/logos/logo.png";
import {
  signInWithGoogle,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import LoginModal from "./LoginModal";
import UseToken from "../Hooks/UseToken";
import Loading from "../Shared/Loading";
const Login = () => {
  const [signInWithGoogle, googleUser, loading, error] =
    useSignInWithGoogle(auth);
  const [openModal, setOpenModal] = useState(false);

  // if (loading) {
  //   return <Loading></Loading>;
  // }
  const [token] = UseToken(googleUser);
  const navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  // if (token) {
  //   navigate("/home");
  // }
  // useEffect(() => {
  //   if (token) {
  //     navigate(from, { replace: true });
  //   }
  // }, [token, from, navigate]);
  return (
    <section>
      <div class="text-center my-40  w-3/6 mx-auto">
        <div class="my-20 h-36">
          {" "}
          <h1 class="my-4 font-bold">Login With</h1>
          <label
            for="my-modal-6"
            onClick={() => setOpenModal(true)}
            class="btn modal-button btn btn-success btn-wide text-white"
          >
            Email & Password
          </label>
          <div class="divider max-w-sm mx-auto">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            class="btn btn-wide btn-outline btn-primary my-5"
          >
            {" "}
            <img
              style={{ width: "31px", height: "31.74px" }}
              src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-webinar-optimizing-for-success-google-business-webinar-13.png"
              alt=""
            ></img>{" "}
            <span class="text-black">Continue with Google</span>
          </button>
          <p class="">
            <small>Don't have and account?</small>{" "}
            <Link class="underline text-blue-500" to="/register">
              Create a new account
            </Link>
          </p>
          {openModal && <LoginModal setOpenModal={setOpenModal}></LoginModal>}
        </div>
      </div>
    </section>
  );
};

export default Login;
