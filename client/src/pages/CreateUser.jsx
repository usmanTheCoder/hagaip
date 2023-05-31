import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingBar from "react-top-loading-bar";
import {
  createAdminUser,
  setAlertMsg,
  setProgress,
} from "../../toolkit/slices/authSlice";
import { useNavigate } from "react-router";
import { alertNotification } from "../components/alertNotification";

const CreateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { progress, alertMsg } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setProgress(40));
    dispatch(createAdminUser(formData)).then(() => {
      if (alertMsg) {
        dispatch(setProgress(100));
        return
      }
      navigate("/dashboard");
    });
  };
  setTimeout(() => {
    dispatch(setAlertMsg(""));
  }, 4000);

  // console.log(alertMsg)

  return (
    <>
      <LoadingBar
        color="#0061ff"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <div className="container">
        <h2 className="font-semibold text-3xl">Create User</h2>
        <form
          className="pb-4 flex flex-col items-center"
          onSubmit={handleSubmit}
        >
          {alertMsg?.length > 0 && alertNotification(alertMsg, "orange")}
          <div className="border-b border-gray-900/10 pb-12 w-[50vw]">
            <div className="mt-10 grid md:grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2">
                  <input
                    value={formData.firstName}
                    onChange={handleChange}
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.lastName}
                    id="lastName"
                    name="lastName"
                    type="text"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.email}
                    id="email"
                    name="email"
                    type="email"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={formData.password}
                    id="password"
                    name="password"
                    type="password"
                    className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 w-full flex items-center justify-end">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateUser;
