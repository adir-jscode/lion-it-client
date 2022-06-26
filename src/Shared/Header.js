import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, NavLink, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const navigate = useNavigate();
  const [user, loading, error] = useAuthState(auth);
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);
  useEffect(() => {
    fetch(`http://localhost:5000/profile?email=${user?.email}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
      });
  }, [reload]);
  const logout = () => {
    signOut(auth);
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  const menu = (
    <>
      <li>
        <NavLink to="/home">Home</NavLink>
      </li>
      {user ? (
        <li>
          <NavLink to="/dashboard/profile">Dashboard</NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
      )}
    </>
  );
  return (
    <div>
      <div class="navbar bg-base-100">
        <div class="navbar-start">
          <div class="dropdown">
            <label tabindex="0" class="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {menu}
            </ul>
          </div>
          <a class="btn btn-ghost normal-case text-xl">LION IT</a>
        </div>
        <div class="navbar-center hidden lg:flex">
          <ul class="menu menu-horizontal p-0">{menu}</ul>
        </div>

        {user && (
          <div class=" navbar navbar-end dropdown dropdown-end">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar">
              <div class="w-10 rounded-full">
                {user.photoURL ? (
                  <img src={user.photoURL} />
                ) : (
                  <img src="https://api.lorem.space/image/face?hash=33791" />
                )}
              </div>
            </label>
            <ul
              tabindex="0"
              class="menu menu-compact mt-40 p-5 dropdown-content shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <NavLink to="/dashboard/profile" class="justify-between">
                  {" "}
                  <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                  Profile
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`edit-profile/${users?._id}`}
                  className="justify-between"
                >
                  <FontAwesomeIcon icon={faPenToSquare}></FontAwesomeIcon>
                  <span className="px-2">Edit Profile</span>
                </NavLink>
              </li>
              <li>
                <button onClick={logout}>
                  <FontAwesomeIcon icon={faRightFromBracket}></FontAwesomeIcon>
                  Logout
                </button>
              </li>
            </ul>
            <div class="dropdown">
              <label for="my-drawer-2" class="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
