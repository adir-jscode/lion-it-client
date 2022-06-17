import logo from "./logo.svg";
import "./App.css";
import Header from "./Shared/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Register from "./Login/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dashboard from "./Dashboard/Dashboard";
import Profile from "./Dashboard/Profile";
import EditProfile from "./Dashboard/EditProfile";
import RequireAuth from "./Login/RequireAuth";
import User from "./Dashboard/User";
import RequireAdmin from "./Login/RequireAdmin";
import AddService from "./Dashboard/AddService";
import ManageService from "./Dashboard/ManageService";
import ServiceDetails from "./Home/ServiceDetails";
import UpdateService from "./Dashboard/UpdateService";
function App() {
  return (
    <div class="mx-12">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/book/:id"
          element={<ServiceDetails></ServiceDetails>}
        ></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index path="profile" element={<Profile></Profile>} Route />
          <Route
            path="edit-profile"
            element={<EditProfile></EditProfile>}
            Route
          />
          <Route
            path="user"
            element={
              <RequireAdmin>
                <User></User>
              </RequireAdmin>
            }
            Route
          />
          <Route
            path="add-service"
            element={
              <RequireAdmin>
                <AddService></AddService>
              </RequireAdmin>
            }
            Route
          />
          <Route
            path="manage-service"
            element={
              <RequireAdmin>
                <ManageService></ManageService>
              </RequireAdmin>
            }
            Route
          />
          <Route
            path="update-service/:id"
            element={
              <RequireAdmin>
                <UpdateService></UpdateService>
              </RequireAdmin>
            }
            Route
          />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
