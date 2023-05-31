import Logo from "../components/Logo";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { reset, setAlertMsg } from "../../toolkit/slices/authSlice";
import { alertNotification } from "../components/alertNotification";
import { useParams } from "react-router";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const { alertMsg, disable } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const { ac_token } = useParams();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (formData.confirmPassword !== formData.password) {
        dispatch(setAlertMsg("Password dosen't match!"));
        setTimeout(() => {
          dispatch(setAlertMsg(""));
        }, 5000);
        return;
      }
      dispatch(reset({ ...formData, token: ac_token }));
    } catch (error) {
      if (error) {
        return;
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm text-center">
          <Logo />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Reset your password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {alertMsg?.length > 0 &&
            // activeAlertMsg &&
            alertNotification(alertMsg, "green")}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  value={formData.password}
                  onChange={handleChange}
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                disabled={disable}
                type="submit"
                className="flex w-full justify-center rounded-md disabled:bg-indigo-400 disabled:hover:bg-indigo-400 bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {disable ? "Loading..." : "Reset"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
