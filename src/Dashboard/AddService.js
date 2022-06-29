import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "./AddService.css";

const AddService = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const imageKey = "0f9321ee3bc068780e683ded6bbb90ac";
    const image = data.image[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const serviceInfo = {
            name: data.name,
            price: data.price,
            description: data.description,
            image: img,
          };

          fetch("http://localhost:5000/service", {
            method: "POST",
            body: JSON.stringify(serviceInfo),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              toast.success("Service added successfully");
              console.log(data);
            });
        }
      });
  };
  return (
    <div className="w-full max-w-full my-36 shadow-2xl bg-base-100 max-h-screen text-center flex mx-auto py-6 px-14">
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div class="form-control w-full max-w-lg ">
          <label class="label">
            <span class="label-text">Service Name</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-lg"
            {...register("name", {
              required: {
                value: true,
                message: "Please provide service name",
              },
            })}
          />
          <label class="label">
            {errors?.name?.type === "required" && (
              <span class="text-red-700 font-bold">{errors?.name.message}</span>
            )}
          </label>
        </div>
        <div class="form-control w-full max-w-lg ">
          <label class="label">
            <span class="label-text">Price</span>
          </label>
          <input
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-lg"
            {...register("price", {
              required: {
                value: true,
                message: "Please provide service price",
              },
            })}
          />
          <label class="label">
            {errors?.price?.type === "required" && (
              <span class="text-red-700 font-bold">
                {errors?.price.message}
              </span>
            )}
          </label>
        </div>
        <div class="form-control w-full max-w-lg ">
          <label class="label">
            <span class="label-text">Description</span>
          </label>
          <textarea
            type="text"
            placeholder="Type here"
            class="input input-bordered w-full max-w-lg"
            {...register("description", {
              required: {
                value: true,
                message: "Please add description",
              },
            })}
          />
          <label class="label">
            {errors?.description?.type === "required" && (
              <span class="text-red-700 font-bold">
                {errors?.description.message}
              </span>
            )}
          </label>
        </div>
        <div class="form-control mt-6">
          <input
            className="btn btn-success w-full max-w-xs text-white"
            type="submit"
            value="Add Service"
          />
        </div>
      </form>
      <div class="justify-center mx-auto mt-10">
        <input
          type="file"
          name=""
          id=""
          class="btn btn-secondary"
          {...register("image", {
            required: {
              value: true,
              message: "Upload logo",
            },
          })}
        />
        <label class="label">
          {errors?.image?.type === "required" && (
            <span class="text-red-700 font-bold">{errors?.image.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default AddService;
