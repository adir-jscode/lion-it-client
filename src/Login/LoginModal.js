import React, { useEffect } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import UseToken from "../Hooks/UseToken";
import Loading from "../Shared/Loading";

const LoginModal = ({ setOpenModal }) => {
  const [signInWithEmailAndPassword, user, loading, loginError] =
    useSignInWithEmailAndPassword(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [token] = UseToken(user);
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

  if (loading) {
    return <Loading></Loading>;
  }
  let showError;
  if (loginError) {
    showError = (
      <>
        <div>
          <p class="text-xl text-red-700">
            <small>{loginError?.message}</small>
          </p>
        </div>
      </>
    );
  }

  const onSubmit = (data) => {
    console.log(data);
    signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-6" class="modal-toggle" />
      <div class="modal modal-bottom sm:modal-middle">
        <div class="modal-box">
          <h1 class="text-xl font-bold text-neutral">
            Login With Email & Password
          </h1>
          {/* <button class="btn btn-circle btn-outline">
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
          </button> */}
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-lg">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-lg"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Please provide email address",
                  },
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Enter valid email address",
                  },
                })}
              />
              <label class="label">
                {errors?.email?.type === "required" && (
                  <span>{errors.email.message}</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span>{errors.email.message}</span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-lg">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="Type here"
                class="input input-bordered w-full max-w-lg"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Enter your password",
                  },
                  // pattern: {
                  //   value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                  //   message:
                  //     "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                  // },
                })}
              />
              <label class="label">
                {errors.password?.type === "pattern" && (
                  <span class="text-red-700 font-bold">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "required" && (
                  <span class="text-red-700 font-bold">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <input
              class="btn btn-wide btn-primary text-white"
              type="submit"
              value="Login"
            />
            {showError}
          </form>
          <div class="modal-action">
            <label for="my-modal-6" class="btn btn-error">
              Cancel
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
