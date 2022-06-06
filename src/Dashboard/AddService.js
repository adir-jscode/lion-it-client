import React from "react";
import { useForm } from "react-hook-form";

const AddService = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full h-screen text-center flex">
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
        <div class="form-control mt-6">
          <input
            className="btn btn-success w-full max-w-xs text-white"
            type="submit"
            value="Add Service"
          />
        </div>
      </form>
      <div class="justify-center mx-auto mt-10">
        <input type="file" name="" id="" />
      </div>
    </div>
  );
};

export default AddService;
