import React from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
const UpdateProfileModal = ({ modal, setModal, reload, setReload, info }) => {
  const { email } = modal;
  console.log(modal);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const updatedInfo = {
      phone: data.phone,
      location: data.location,
    };
    fetch(`https://intense-plateau-54634.herokuapp.com/user?email=${email}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(updatedInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setModal(false);
        setReload(!reload);
      });
  };

  return (
    <div>
      <input type="checkbox" id="my-modal-3" class="modal-toggle" />
      <div class="modal">
        <div class="modal-box relative">
          <label
            for="my-modal-3"
            class="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 class="text-lg font-bold">Update your basic infomation</h3>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Phone</span>
              </label>
              <input
                type="text"
                defaultValue={info?.phone}
                class="input input-bordered w-full max-w-xs"
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Type here",
                  },
                })}
              />
              <label class="label">
                {errors?.phone?.type === "required" && (
                  <span>{errors.phone.message}</span>
                )}
              </label>
            </div>
            <div class="form-control w-full max-w-xs">
              <label class="label">
                <span class="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="Type here"
                defaultValue={info.location}
                class="input input-bordered w-full max-w-xs"
                {...register("location", {
                  required: {
                    value: true,
                    message: "Type here",
                  },
                })}
              />
              <label class="label">
                {errors?.location?.type === "required" && (
                  <span>{errors.location.message}</span>
                )}
              </label>
            </div>
            <div class="form-control mt-6">
              <input
                className="btn btn-success w-full max-w-xs text-white"
                type="submit"
                value="Save"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileModal;
