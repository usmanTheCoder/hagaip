import { useState } from "react";
import Datagrid from "../components/Datagrid";
import LoadingBar from "react-top-loading-bar";
import { useDispatch, useSelector } from "react-redux";
import { setProgress } from "../../toolkit/slices/authSlice";
import { setSearch } from "../../toolkit/slices/formSlice";

const Dashboard = () => {
  const { progress } = useSelector((state) => state.auth);
  const { profileData } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [selectForms, setSelectForms] = useState(true);
  const [selectUsers, setSelectUsers] = useState(false);

  const handleSelectForms = () => {
    setSelectUsers(false);
    setSelectForms(true);
  };

  const handleSelectUsers = () => {
    setSelectForms(false);
    setSelectUsers(true);
  };

  return (
    <>
      <LoadingBar
        color="#0061ff"
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between">
          <h1 className="text-3xl font-semibold">Dashboard</h1>
          <label
            htmlFor="search"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Search
            <input
              id="search"
              onChange={(e) => dispatch(setSearch(e.target.value))}
              type="text"
              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </label>
        </div>
        {profileData.role === "manager" && (
          <div className="flex gap-2 py-4">
            <button
              onClick={handleSelectForms}
              className={`px-3 py-1 border-2 border-blue-400 ${
                selectForms ? "bg-blue-400 text-white" : "text-blue-400"
              }`}
            >
              Forms
            </button>
            <button
              onClick={handleSelectUsers}
              className={`px-3 py-1 border-2 border-blue-400 ${
                selectUsers ? "bg-blue-400 text-white" : "text-blue-400"
              }`}
            >
              Users
            </button>
          </div>
        )}
        <Datagrid selectForms={selectForms} selectUsers={selectUsers} />
      </div>
    </>
  );
};

export default Dashboard;
