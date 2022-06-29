import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";
const UpdateService = ({ update, loading, setLoading, setUpdate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log("update service id", id);

  const {
    data: service,
    isLoading,
    refetch,
  } = useQuery(["service", id], () =>
    fetch(`https://intense-plateau-54634.herokuapp.com/service/${id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((response) => response.json())
  );

  const {
    register,
    handleSubmit,
    watch,
    resetField,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const serviceInfo = {
      name: data.name,
      price: data.price,
    };

    const url = `https://intense-plateau-54634.herokuapp.com/service/${id}`;
    fetch(
      url,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(serviceInfo),
      },
      []
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          refetch();
          toast.success("Updated Successfully");
          setLoading(!loading);
        }
      });
  };
  const handleUpdate = () => {
    navigate("/dashboard/manage-service");
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <div class="hero min-h-screen bg-base-100">
        <div class="flex-col lg:flex-row-reverse">
          <div class="">
            <h1 class="text-xl font-bold">Service Name: {service?.name}</h1>
            <h1 class="text-xl font-bold">Price: ${service?.price}</h1>
            <p class="py-6">{service?.description}</p>
          </div>
          <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div class="card-body">
              <form action="" onSubmit={handleSubmit(onSubmit)}>
                <h1 class="font-bold my-5">
                  Service Name:{" "}
                  <input
                    type="text"
                    placeholder="Type here"
                    defaultValue={service?.name}
                    class="input input-bordered w-full max-w-sm"
                    {...register("name")}
                  />
                </h1>
                <h1 class="font-bold my-5">
                  Price:{" "}
                  <input
                    type="text"
                    defaultValue={service?.price}
                    placeholder="Type here"
                    class="input input-bordered w-full max-w-sm"
                    {...register("price", {
                      required: {
                        value: true,
                        message: "Please provide service price",
                      },
                    })}
                  />
                </h1>
                <div class="form-control mt-6">
                  <input
                    className="btn btn-success w-full max-w-xs text-white"
                    type="submit"
                    value="Update"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <div class="modal-action">
            <label onClick={() => handleUpdate(update._id)} class="btn">
              Update
            </label>
            <label for="my-modal" class="btn">
              Cancel
            </label>
          </div> */}
    </div>
    //   </div>
    // </div>
  );
};

export default UpdateService;
