import React from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
const UpdateService = ({ update, loading, setLoading }) => {
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    const serviceInfo = {
      name: data.name,
      price: data.price,
    };

    const url = `http://localhost:5000/service/${update._id}`;
    fetch(
      url,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(serviceInfo),
      },
      []
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setLoading(!loading);
      });
  };
  const handleUpdate = (id) => {
    console.log(id);
  };
  return (
    <div>
      <input type="checkbox" id="my-modal" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box">
          <label
            htmlFor="my-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <h1 class="font-bold my-5">
              Service Name:{" "}
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-lg"
                {...register("name")}
              />
            </h1>
            <h1 class="font-bold my-5">
              Price:{" "}
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
            </h1>
            <div class="form-control mt-6">
              <input
                className="btn btn-success w-full max-w-xs text-white"
                type="submit"
                value="Update"
              />
            </div>
          </form>
          <h3 class="font-bold text-lg">{update?.name}</h3>

          <h3 class="font-bold text-lg">Price: ${update?.price}</h3>

          <p class="py-4">{update.description}</p>
          {/* <div class="modal-action">
            <label onClick={() => handleUpdate(update._id)} class="btn">
              Update
            </label>
            <label for="my-modal" class="btn">
              Cancel
            </label>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UpdateService;
