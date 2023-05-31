import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateUserRole } from "../../toolkit/slices/authSlice";

const UserModal = ({ setUserModal, userData }) => {
  const [checked, setChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userData.role === "manager") {
      setChecked(!checked);
    }
  }, []);

  const updateRole = () => {
    dispatch(
      updateUserRole({ id: userData._id, role: checked ? "manager" : "user" })
    );
    setUserModal(false);
  };

  return (
    <div className="">
      {/* <!-- Large Modal --> */}
      <div
        id="large-modal"
        tabIndex="-1"
        className="fixed z-[1000] flex justify-center items-start bg-black top-0 left-0 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-opacity-40 max-h-full"
      >
        <div className="relative w-full max-w-4xl max-h-full">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow dark:bg-white-700">
            {/* <!-- Modal header --> */}
            <div className="flex items-center justify-between p-5 border-b border-gray-300 rounded-t">
              <h3 className="text-xl font-medium text-black">User Forms</h3>
              <button
                onClick={() => setUserModal(false)}
                type="button"
                className="text-black bg-transparent hover:bg-gray-200 hover:text-black rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="large-modal"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            {/* <!-- Modal body --> */}
            <div className="p-6 space-y-6">
              <div>
                <span className="font-semibold">Name: </span>{" "}
                <p>
                  {userData.firstName} {userData.lastName}
                </p>
              </div>
              <div>
                <span className="font-semibold">Email: </span>{" "}
                <p>{userData.email}</p>
              </div>
              <div className="flex items-start mb-6">
                <div className="flex gap-2 h-5">
                  <input
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                    id="role"
                    type="checkbox"
                    value=""
                    className="w-6 h-6 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                  />
                  <label htmlFor="role" className="font-semibold text-gray-900">
                    Manager
                  </label>
                </div>
              </div>
            </div>
            {/* <!-- Modal footer --> */}
            <div className="flex items-center p-6 space-x-2 border-t border-gray-300 rounded-b">
              <button
                onClick={updateRole}
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
