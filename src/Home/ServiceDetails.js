import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../Shared/Loading";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";

const ServiceDetails = () => {
  const [user, loading, error] = useAuthState(auth);
  const { id } = useParams();

  const {
    data: service,
    isLoading,
    refetch,
  } = useQuery(["service", id], () =>
    fetch(`http://localhost:5000/service/${id}`).then((response) =>
      response.json()
    )
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  if (isLoading) {
    return <Loading></Loading>;
  }
  const onSubmit = async (data) => {
    const userInfo = {
      name: user?.name,
      email: user?.email,
      phone: data.phone,
    };
    console.log(userInfo);

    // fetch(`http://localhost:5000/booked/${user.email}`, {
    //   method: "POST",
    //   body: JSON.stringify(userInfo),
    //   headers: {
    //     "Content-type": "application/json; charset=UTF-8",
    //   },
    // })
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));
  };
  return (
    <div>
      <h1 class="text-5xl text-center font-bold">Confirm Your Booking now!</h1>
      <div class="hero min-h-screen bg-base-100">
        <div class="hero-content flex-col lg:flex-row-reverse">
          <div class="text-center mx-20 lg:text-left">
            <img style={{ width: "440px" }} src={service.image} alt="" />
            <h1 class="text-slate-400 font-bold">
              Service Name: {service.name}
            </h1>
            <h1 class="text-slate-400 font-bold">Price: ${service.price}</h1>
            <p class="py-6">{service.description}</p>
          </div>
          <div class="card px-10 py-10 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">What is your name?</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  defaultValue={user?.displayName}
                  disabled
                  class="input input-bordered w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Please enter your name",
                    },
                  })}
                />
                <label class="label">
                  {/* {errors?.name?.type === "required" && (
                    <span>{errors.name.message}</span>
                  )} */}
                </label>
              </div>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Email Address</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  defaultValue={user?.email}
                  disabled
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
                  {/* {errors?.email?.type === "required" && (
                    <span class="text-red-700">{errors.email.message}</span>
                  )}
                  {errors.email?.type === "pattern" && (
                    <span class="text-red-700">{errors.email.message}</span>
                  )} */}
                </label>
              </div>
              <div class="form-control w-full max-w-xs">
                <label class="label">
                  <span class="label-text">Phone</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here"
                  class="input input-bordered w-full max-w-xs"
                  {...register("phone", {
                    required: {
                      value: true,
                      message: "please enter your phone number",
                    },
                  })}
                />
                <label class="label">
                  {errors?.phone?.type === "required" && (
                    <span class="text-red-700">{errors.phone.message}</span>
                  )}
                </label>
              </div>

              <div class="form-control mt-6">
                <input
                  className="btn btn-success w-full max-w-xs text-white"
                  type="submit"
                  value="Confirm"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
