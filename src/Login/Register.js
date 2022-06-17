import { faEnvelope, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import auth from "../firebase.init";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import { useUpdateProfile } from "react-firebase-hooks/auth";
import { useLocation, useNavigate } from "react-router-dom";
import UseToken from "../Hooks/UseToken";
import Loading from "../Shared/Loading";

const Register = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating, updateProfileError] = useUpdateProfile(auth);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // if (loading) {
  //   return <Loading></Loading>;
  // }
  const [token] = UseToken(user);

  const navigate = useNavigate();
  const location = useLocation();
  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);
  const onSubmit = async (data) => {
    await createUserWithEmailAndPassword(data.email, data.password);
    await updateProfile({ displayName: data.name });
  };
  return (
    <div>
      <div class="hero min-h-screen bg-base-100">
        <div class="hero-content flex-col lg:flex-row">
          <div class="text-center lg:text-left">
            <img
              class="max-w-sm"
              src="https://img.freepik.com/free-vector/account-concept-illustration_114360-399.jpg?t=st=1653975056~exp=1653975656~hmac=581efc32d205d4932f869c222cbde1a899ca718fa343ad2aea33dac2b2e046eb&w=740"
              alt=""
            />
          </div>
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <h1 class="text-2xl font-bold">Create a new Account</h1>
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">What is your name?</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                    {...register("name", {
                      required: {
                        value: true,
                        message: "Please enter your name",
                      },
                    })}
                  />
                  <label class="label">
                    {errors?.name?.type === "required" && (
                      <span>{errors.name.message}</span>
                    )}
                  </label>
                </div>
                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">Email Address</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "please enter your email address",
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
                      <span class="text-red-700">{errors.email.message}</span>
                    )}
                    {errors.email?.type === "pattern" && (
                      <span class="text-red-700">{errors.email.message}</span>
                    )}
                  </label>
                </div>
                <div class="form-control w-full max-w-xs">
                  <label class="label">
                    <span class="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-xs"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Please enter your password",
                      },
                      pattern: {
                        value: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/,
                        message:
                          "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
                      },
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
                <select
                  {...register("category", {
                    required: "Please select a category",
                  })}
                  class="select select-bordered w-full max-w-xs"
                >
                  <option value="">Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <label class="label">
                  {errors.category?.type === "required" && (
                    <span class="text-red-700 font-bold">
                      {errors.category.message}
                    </span>
                  )}
                </label>
                <div class="form-control mt-6">
                  <input
                    className="btn btn-success w-full max-w-xs text-white"
                    type="submit"
                    value="Register"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
