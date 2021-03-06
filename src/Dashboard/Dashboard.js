import {
  faCartShopping,
  faDiagramProject,
  faMessage,
  faPenToSquare,
  faRightFromBracket,
  faUpload,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import UseAdmin from "../Hooks/UseAdmin";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [admin] = UseAdmin(user);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    fetch("https://intense-plateau-54634.herokuapp.com/user", {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data[0]._id);
        setUsers(data);
      });
  }, [reload]);
  const logout = () => {
    signOut(auth);
    navigate("/");
  };
  return (
    <div>
      <div class="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex flex-col">
          <Outlet></Outlet>
        </div>
        <div class="drawer-side">
          <label for="my-drawer-2" class="drawer-overlay "></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {user.photoURL ? (
              <img
                class="rounded-full mb-10"
                style={{ width: "120px", height: "120px" }}
                src={user?.photoURL}
                alt=""
              />
            ) : (
              <img
                class="rounded-full mb-10"
                style={{ width: "120px", height: "120px" }}
                src="https://cineplex-ticket-admin.cineplexbd.com/uploads/user/user.png"
                alt=""
              />
            )}

            <>
              {/* <button>
                <Link
                  to={`edit-profile/${users[0]?.email}`}
                  className="btn btn-xs mr-36"
                >
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                  <span className="px-2">Edit Profile</span>
                </Link>
              </button> */}
            </>
            <h1 class="text-purple-800 font-bold my-2">
              Hi, {user?.displayName}
            </h1>

            <li>
              <NavLink to="profile">
                {" "}
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon> Profile
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="edit-profile">
                {" "}
                <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>Edit
                Profile
              </NavLink>
            </li> */}
            {admin && (
              <li>
                <Link to="user">
                  {" "}
                  <FontAwesomeIcon icon={faUsers}></FontAwesomeIcon>Admins{" "}
                </Link>
              </li>
            )}
            {admin && (
              <>
                <li>
                  <Link to="add-service">
                    {" "}
                    <FontAwesomeIcon icon={faUpload}></FontAwesomeIcon>Add New
                    Service{" "}
                  </Link>
                </li>
                <li>
                  <Link to="manage-service">
                    {" "}
                    <FontAwesomeIcon icon={faDiagramProject}></FontAwesomeIcon>
                    Manage Service{" "}
                  </Link>
                </li>
                <li>
                  <Link to="manage-order">
                    {" "}
                    <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                    Manage orders{" "}
                  </Link>
                </li>
              </>
            )}

            {!admin && (
              <>
                <li>
                  <Link to="my-order">
                    {" "}
                    <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                    Order
                  </Link>
                </li>
              </>
            )}

            <li>
              <button onClick={logout}>
                <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
